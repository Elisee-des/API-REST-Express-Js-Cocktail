/**********************************************************/
/**** Importation des modules ****/
const express = require('express');
const cors = require('cors');

/**********************************************************/
/**** Importation de la connexion a la base de donner ****/
let DB = require('./db.config');


/**********************************************************/
/******* Initialisation de l'API *******/
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**********************************************************/
/******* Mise en place du routage *******/
app.get('/', (req, res) => res.send(`J'suis en ligne. Bienvenu ! `));

app.get('*', (req, res) => res.status(501).send(`Route non determiné`));

/**********************************************************/
/******* Start serveur et test de demarrage *******/

DB.authenticate()
    .then( () => console.log("Database connection ok"))
    .then( () => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Serveur en lecture sur le port ${process.env.SERVER_PORT}`);
        })
    })
    .catch(err => console.log('Database Error', err))
