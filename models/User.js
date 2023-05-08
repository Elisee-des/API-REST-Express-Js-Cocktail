/****************************************************************/
/*************** import des modules necessaires *****************/
const { DataTypes } = require('sequelize');
const DB = require('../db.config');

/****************************************************************/
/******************* Definition du model User *******************/
const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    pseudo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,    //Ici une vallidation de donner
        }
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i //Ici une contrainte
    }
}, { paranoid: true })        //Ici pour faire du softDelete

module.exports = User;
