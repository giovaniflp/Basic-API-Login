//Require some Node Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const passport = require('passport');

//Express App Start
var app = express();

//View engine of the App
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Express configs
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Making the session for the browser.
app.use(session({
    secret: 'notSoSecret',
    cookie: { maxAge: 2 * 60 * 1000 },
    resave: false,
    saveUninitialized: false
}))

//Middleware configuration
app.use(passport.initialize())
app.use(passport.session())
require('./services/auth')(passport)

let dao = require('./database/dao')

//App routes config file
require('./routes/config')(app)
app.listen(3000, '127.0.0.1')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;