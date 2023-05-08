/************************************************************/
/**************** Import des module necessaire **************/
const { Sequelize } = require('sequelize');

/**************** Connexion a la base de donner *************/
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)

/************************************************************/
/**************** Synchronisation des modèles *************/
// sequelize.sync()

module.exports = sequelize;