var Sequelize = require('sequelize');
var Doctor = require('./doctor');
var Patient = require('./patient');

var sequelize = new Sequelize('postgres://postgres@localhost:5432/sai_db');

var PatientDiagnostic = sequelize.define('patientDiagnostics', {
    patientDiagnosticId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    comment: {
        type: Sequelize.STRING
    },
    feedback: {
        type: Sequelize.STRING
    },
    patientname: {
        type:Sequelize.STRING
    },
    doctorId: {
        type: Sequelize.INTEGER
    },
    patientId: {
        type: Sequelize.INTEGER
    }
}, {
    classMethods: {
        associate: function(Doctor) {
            PatientDiagnostic.belongsTo(Doctor);
        },
        associate: function(Patient) {
            PatientDiagnostic.belongsTo(Patient);
        }
    },
    timestamps: false
});

sequelize.sync()
    .then(() => console.log('patientDiagnostics table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = PatientDiagnostic;