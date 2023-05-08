/**************************************************/
/******** Import des modules necessaires **********/
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

/**************************************************/
/******** Recuperation du route d'express *********/
let router = express.Router();

/**************************************************/
/********** Routage de la resource USER ***********/
router.get(``, (req, response) => {
    User.findAll()
    .then( users => response.json({ data: users }) )
    .catch( err => response.status(500).json({ message: 'Database Error', error: err }) )
});

router.get(`/:id`, (request, response) => {
    let userId = parseInt(request.params.id)

    //Verification si le champs id est present et coherent
    if(!userId)
    {
        return response.status(400).json({ message: "Manque de donnée" })
    }

    //Recuperation de l'utilisateur
    User.findOne({ where: {id: userId}, raw: true })
        .then(user => {
            if(user === null){
                return response.status(404).json({ message: "Ce utilisateur n'existe pas !" })
            }

            return response.status(200).json({ data: user })
        })
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))
});

router.put(``, (request, response) => {
    const {nom, prenom, pseudo, email, password} = request.body

    //Validation des donnees
    if(!nom || !prenom || !pseudo || !email || !password)
    {
        return response.status(400).json({ message: "Manque de donnée" })
    }

    User.findOne({ where: {email: email}, raw: true })
        .then( user => {
            //On verifie si l'utilisateur existe deja
            if(user !== null){
                return response.status(409).json({ message: `L'utilisateur ${nom} existe deja !` })
            }

            //Hasher le mot de passe
             bcrypt.hash(password, parseInt(process.env.BCRIPT_SALT_ROUND))
                .then( hash => {
                    request.body.password = hash;

                    //Creation de l'utilisateur
                    User.create(request.body)
                    .then( user => response.status(201).json({ message: "Utilisateur creer avec success", data: user }) )
                    .catch(err => response.status(500).json({ message: "Erreur de l'hashage de mot de passe !!", error: err }))
                } )
                } )

           
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});

router.patch(`/:id`, (request, response) => {
    let userid = parseInt(request.params.id);

    //On verifie si le champ idee est present et coherent
    if(!userid)
    {
        return response.status(400).json({ message: "Missing parameter" })
    }

    //Recherche de l'utilisateur
    User.findOne({ where: {id: userid}, raw: true })
        .then( user => {
            //On verifie si l'utilisateur existe
            if(user === null)
            {
                return response.status(404).json({ message: "Cette utilisateur n'existe pas !" })
            }

            //Mise a jour de l'utilisateur
            User.update(request.body, { where: {id: userid} })
                .then( user => response.status(201).json({ message: "Ulisateur mise a jour", data: user }) )
                .catch(err => response.status(500).json({ message: "Database Error", error: err }))

        } )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});

router.delete(`untrash/:id`, (request, response) => {
    let userId = parseInt(request.params.id);

    //Verification si le champ id est present et coherent
    if(!userId) {
        return response.status(400).json({ message: "Missing parameter" })
    }

    //On restaure l'utilisateur supprimer
    User.restore({ where: {id: userId} })
        .then( () => response.status(204).json({}) )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});

router.delete(`trash/:id`, (request, response) => {
    let userId = parseInt(request.params.id);

    //Verification si le champ id est present et coherent
    if(!userId) {
        return response.status(400).json({ message: "Missing parameter" })
    }

    // Suppresion de l'utilisateur
    User.destroy({ where: {id: userId} })
        .then( () => response.status(204).json({}) )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});

router.delete(`/:id`, (request, response) => {
    let userId = parseInt(request.params.id);

    //Verification si le champ id est present et coherent
    if(!userId) {
        return response.status(400).json({ message: "Missing parameter" })
    }

    // Suppresion de l'utilisateur
    User.destroy({ where: {id: userId}, force: true })
        .then( () => response.status(204).json({}) )
        .catch(err => response.status(500).json({ message: "Database Error", error: err }))

});