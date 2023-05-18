module.exports = function(app) {
    //A variable is a HTML arquive
    var indexRouter = require('./index');
    var usersRouter = require('./users');
    var loginRouter = require('./login');
    var registerRouter = require('./register')


    let middlewareAutorization = function(req, resp, next) {
        if (req.isAuthenticated()) return next()
        else resp.redirect('/login')
    }

    //App uses the JS file route configuration, a middleware in the middle(optional) and connect the HTML variable arquive
    app.use('/users', middlewareAutorization, usersRouter);
    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter)
}