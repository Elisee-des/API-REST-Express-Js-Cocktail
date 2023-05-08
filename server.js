/**********************************************************/
/**** Importation des modules ****/
const express = require('express');
const cors = require('cors');

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
/******* Start serveur *******/
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur en lecture sur le port ${process.env.SERVER_PORT}`);
} )