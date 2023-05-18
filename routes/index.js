var express = require('express');
var router = express.Router();

//Home page of the app
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', user: 'Usuário' });
});

module.exports = router;