var express = require('express');
var router = express.Router();
let bcrypt = require('bcryptjs');
const mysql2 = require('mysql2');
const passport = require('passport')

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Oxiprana169',
    port: '3306',
    database: 'login'
});

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            connection.query('INSERT INTO users (name, login, password) VALUES (?, ?, ?)', [
                req.body.user,
                req.body.name,
                hash
            ], function(err) {
                if (err) { return next(err); }
                var usuario = {
                    id: this.LastID,
                    name: req.body.name
                };
                req.login(usuario, function(err) {
                    if (err) { return next(err); }
                    res.redirect('/')
                })
            })
        });
    });

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

})
module.exports = router;