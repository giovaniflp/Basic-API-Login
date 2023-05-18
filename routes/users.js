var express = require('express');
var router = express.Router();

//Logged Page (Secure)
router.get('/', function(req, res, next) {
    res.render('users');
});

router.post('/', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;