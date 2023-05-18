var express = require('express');
var router = express.Router();
const passport = require('passport')

//Login forms
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
}))

module.exports = router;