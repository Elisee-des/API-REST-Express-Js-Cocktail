/****************************************************************/
/*************** import des modules necessaires *****************/
const { DataTypes } = require('sequelize');
const DB = require('../db.config');

/****************************************************************/
/******************* Definition du model Cocktail *******************/
const Cocktail = DB.define('Cocktail', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false
    },
    recette: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false
    },
    
}, { paranoid: true })        //Ici pour faire du softDelete

module.exports = Cocktail;
