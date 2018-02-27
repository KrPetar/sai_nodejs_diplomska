var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

/**var Doctor = require('./models/doctor');
var Patient = require('./models/patient');
var PatientDiagnostic = require('./models/patientDiagnostic');
const { Pool, Client } = require('pg');**/

/**const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sai_db',
    password: 'petar123',
    port: 5432
});**/
/**const client = new Client({
    user: 'dnedcxrd',
    host: 'postgres://dnedcxrd:nZpIazZQcyvxW5YmOVNH90g82jFWiCtH@horton.elephantsql.com:5432/dnedcxrd',
    database: 'dnedcxrd',
    password: 'nZpIazZQcyvxW5YmOVNH90g82jFWiCtH',
    port: 5432
});**/

dbDoctor = {
    doctorId: 1,
    email: 'kr.petar5@gmail.com',
    passsword: '12345',
    firstname: 'Petar',
    surname: 'Krstevski',
    ssn: '1012982450080'
};
dbPatient = {
    patientId: 1,
    doctorId: 1,
    email: 'stefan.s@gmail.com',
    passsword: '12345',
    firstname: 'Stefan',
    surname: 'Stefanovski',
    ssn: '0208992450350'
};
dbPatients = [
    {
        patientId: 1,
        doctorId: 1,
        email: 'stefan.s@gmail.com',
        passsword: '12345',
        firstname: 'Stefan',
        surname: 'Stefanovski',
        ssn: '0208992450350'
    }
];
dbPatientDiagnostics = [
    {
        patientDiagnosticId: 1,
        doctorId: 1,
        patientId: 1,
        comment: 'My head hurts!',
        feedback: 'Take this pills.',
        patientname: 'Stefan Stefanovski'
    },
    {
        patientDiagnosticId: 2,
        doctorId: 1,
        patientId: 1,
        comment: 'My nose is running!',
        patientname: 'Stefan Stefanovski'
    }
];
var app = express();
app.set('port', 150);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'OCNqVsjins',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1800000
    }
}));
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});
app.use(morgan('dev'));
app.use(express.static(__dirname + '\\public'));
app.set('views', __dirname + '\\views');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        res.redirect('/doctor');
    }
    else if(req.session.user && req.cookies.user_sid) {
        res.redirect('/patient');
    }
    else {
        res.redirect('/home');
    }
});

app.get('/home', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        res.redirect('/doctor');
    }
    else if(req.session.user && req.cookies.user_sid) {
        res.redirect('/patient');
    }
    else {
        res.render('home.html');
    }
});

app.get('/login', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        res.redirect('/doctor');
    }
    else if(req.session.user && req.cookies.user_sid) {
        res.redirect('/patient');
    }
    else {
        res.render('login.html');
    }
});

app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    if(email == dbDoctor.email && password == dbDoctor.passsword) {
        req.session.user = dbDoctor;
        req.session.doctor = true;
        res.redirect('/doctor');
    }
    else if(email == dbPatient.email && password == dbPatient.passsword) {
        req.session.user = dbPatient;
        res.redirect('/patient');
    }
    else {
        res.redirect('/login');
    }
    
    /**Doctor.findOne({ where: { email: email, password: password } }).then(function(doctor) {
        if(!doctor) {
            Patient.findOne({ where: { email: email, password: password } }).then(function(patient) {
                if(!patient) {
                    res.redirect('/login');
                }
                else {
                    req.session.user = patient.dataValues;
                    res.redirect('/patient');
                }
            });
        }
        else {
            req.session.user = doctor.dataValues;
            req.session.doctor = true;
            res.redirect('/doctor');
        }
    });**/
});

app.get('/doctor', (req, res) => {
    if(req.session.user && req.cookies.user_sid && req.session.doctor) {
        var patientsRes;
        var patientDiagnosticsRes;

        patientsRes = dbPatients;
        patientDiagnosticsRes = dbPatientDiagnostics;

        res.render('doctor.html', {
            user: req.session.user,
            patients: patientsRes,
            patientDiagnostics: patientDiagnosticsRes
        });

        /**Patient.findAll({ where: { doctorId: Number(req.session.user.doctorId) } }).then(function(patients) {
            if(patients) {
                patientsRes = patients;
            }
            else {
                patientsRes = [];
            }

            PatientDiagnostic.findAll({ where: { doctorId: Number(req.session.user.doctorId) } }).then(function(patientDiagnostics) {
                if(patientDiagnostics) {
                    patientDiagnosticsRes = patientDiagnostics;
                }
                else {
                    patientDiagnosticsRes = [];
                }

                res.render('doctor.html', {
                    user: req.session.user,
                    patients: patientsRes,
                    patientDiagnostics: patientDiagnosticsRes
                });
            });
        });**/
    }
    else {
        res.redirect('/login');
    }
});

app.post('/sendFeedback', (req, res) => {
    var patientDiagnosticId = Number(req.body.patientDiagnosticId);
    var feedback = req.body.feedback;

    dbPatientDiagnostics[patientDiagnosticId - 1].feedback = feedback;

    res.redirect('/doctor');
    
    /**PatientDiagnostic.findOne({ where: { patientDiagnosticId: Number(patientDiagnosticId) } }).then(function(patientDiagnostic) {
        if(patientDiagnostic) {
            patientDiagnostic.updateAttributes({
                feedback: feedback
            })
            .done(function(err) {
                res.redirect('/doctor');
            });
        }
    });**/
});

app.get('/patient', (req, res) => {
    if(req.session.user && req.cookies.user_sid) {
        var doctorRes;
        var patientDiagnosticsRes;

        doctorRes = dbDoctor;
        patientDiagnosticsRes = dbPatientDiagnostics;

        res.render('patient.html', {
            user: req.session.user,
            doctor: doctorRes,
            patientDiagnostics: patientDiagnosticsRes
        });

        /**Doctor.findOne({ where: { doctorId: Number(req.session.user.doctorId) } }).then(function(doctor) {
            if(doctor) {
                doctorRes = doctor;
            }
            else {
                doctorRes = [];
            }

            PatientDiagnostic.findAll({ where: { patientId: Number(req.session.user.patientId) } }).then(function(patientDiagnostics) {
                if(patientDiagnostics) {
                    patientDiagnosticsRes = patientDiagnostics;
                }
                else {
                    patientDiagnosticsRes = [];
                }
                res.render('patient.html', {
                    user: req.session.user,
                    doctor: doctorRes,
                    patientDiagnostics: patientDiagnosticsRes
                });
            });
        });**/
    }
    else {
        res.redirect('/login');
    }
});

app.post('/sendDiagnostic', (req, res) => {
    var comment = req.body.comment;
    var patientFirstname = req.session.user.firstname;
    var patientSurname = req.session.user.surname;
    var patientname = patientFirstname + ' ' + patientSurname;

    dbPatientDiagnostics[dbPatientDiagnostics.length] = {
        patientDiagnosticId: dbPatientDiagnostics.length + 1,
        doctorId: Number(req.session.user.doctorId),
        patientId: Number(req.session.user.patientId),
        comment: comment,
        patientname: patientname
    };

    res.redirect('/patient');

    /**PatientDiagnostic.create({
        doctorId: Number(req.session.user.doctorId),
        patientId: Number(req.session.user.patientId),
        comment: comment,
        patientname: patientname
    })
    .done(function(err) {
        res.redirect('/patient');
    });**/
});

app.get('/logout', (req, res) => {
    req.session.user = null;
    req.session.doctor = null;
    res.clearCookie('user_sid');
    res.redirect('/home');
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});

app.listen(app.get('port'), () => console.log(`App started on port ${app.get('port')}`));