var Sequelize = require('sequelize');
var Patient = require('./patient');

var sequelize = new Sequelize('postgres://postgres@localhost:5432/sai_db');

var Doctor = sequelize.define('doctors', {
    doctorId: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    ssn: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false
});

sequelize.sync()
    .then(() => console.log('doctors table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = Doctor;