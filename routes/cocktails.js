/**************************************************/
/******** Import des modules necessaires **********/
const express = require('express');
const Cocktail = require('../models/Cocktail');

/**************************************************/
/******** Recuperation du route d'express *********/
let router = express.Router();

/**************************************************/
/********** Routage de la resource Cocktail *******/
router.get(``, (req, response) => {
    Cocktail.findAll()
    .then( cocktails => response.json({ data: cocktails }) )
    .catch( err => response.status(500).json({ message: 'Database Error', error: err }) )
});

router.get(`/:id`, (request, response) => {
    let cocktailId = parseInt(request.params.id)

    //Verification si le champs id est present et coherent
    if(!cocktailId)
    {
        return response.status(400).json({ message: "Manque de donnée" })
    }

    //Recuperation de l'utilisateur
    Cocktail.findOne({ where: {id: cocktailId}, raw: true })
        .then(cocktail => {
            if(cocktail === null){
                return response.status(404).json({ message: "Cet cocktail n'existe pas !" })
            }

            return response.status(200).json({ data: cocktail })
        })
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))
});

router.put(``, (request, response) => {
    const {nom, description, recette, Cocktail_id } = request.body

    //Validation des donnees
    if(!nom || !description || !recette || Cocktail_id)
    {
        return response.status(400).json({ message: "Manque de donnée" })
    }

    Cocktail.findOne({ where: {nom: nom}, raw: true })
        .then( cocktail => {
            //On verifie si l'utilisateur existe deja
            if(cocktail !== null){
                return response.status(409).json({ message: `Le cocktail ${nom} existe deja !` })
            }

            Cocktail.create(request.body)
            .then( Cocktail => response.status(201).json({ message: "Cocktail creer avec success", data: Cocktail }) )
            .catch(err => response.status(500).json({ message: "Database Error", error: err }))

    });
});

router.patch(`/:id`, (request, response) => {
    let cocktailId = parseInt(request.params.id);

    //On verifie si le champ idee est present et coherent
    if(!cocktailId)
    {
        return response.status(400).json({ message: "Missing parameter" })
    }

    //Recherche de l'utilisateur
    Cocktail.findOne({ where: {id: cocktailId}, raw: true })
        .then( cocktail => {
            //On verifie si l'utilisateur existe
            if(cocktail === null)
            {
                return response.status(404).json({ message: "Cet cocktail n'existe pas !" })
            }

            //Mise a jour de l'utilisateur
            Cocktail.update(request.body, { where: {id: cocktailId} })
                .then( cocktail => response.status(201).json({ message: "Cocktail mise a jour", data: cocktail }) )
                .catch(err => response.status(500).json({ message: "Database Error", error: err }))

        } )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});

router.delete(`untrash/:id`, (request, response) => {
    let cocktailId = parseInt(request.params.id);

    //Verification si le champ id est present et coherent
    if(!cocktailId) {
        return response.status(400).json({ message: "Missing parameter" })
    }

    //On restaure l'utilisateur supprimer
    Cocktail.restore({ where: {id: cocktailId} })
        .then( () => response.status(204).json({}) )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});

router.delete(`trash/:id`, (request, response) => {
    let cocktailId = parseInt(request.params.id);

    //Verification si le champ id est present et coherent
    if(!cocktailId) {
        return response.status(400).json({ message: "Missing parameter" })
    }

    // Suppresion de l'utilisateur
    Cocktail.destroy({ where: {id: cocktailId} })
        .then( () => response.status(204).json({}) )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});

router.delete(`/:id`, (request, response) => {
    let cocktailId = parseInt(request.params.id);

    //Verification si le champ id est present et coherent
    if(!cocktailId) {
        return response.status(400).json({ message: "Missing parameter" })
    }

    // Suppresion de l'utilisateur
    Cocktail.destroy({ where: {id: cocktailId}, force: true })
        .then( () => response.status(204).json({}) )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});