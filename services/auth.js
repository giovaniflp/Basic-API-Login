module.exports = function(passport) {
    const bcrypt = require('bcryptjs')

    const LocalStrategy = require('passport-local').Strategy

    let dao = require('../database/dao')

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        dao.findById(id)
            .then((rows) => {
                let user = rows[0]
                return done(null, user)
            }).catch(err => {
                return done(err, null)
            })
    })

    let strategyConfig = {
        usernameField: 'name',
        usernamePassword: 'password'
    }

    passport.use(new LocalStrategy(strategyConfig, function(username, password, done) {
        dao.findByUsername(username)
            .then(([rows]) => {
                if (rows.length == 0) return done(null, false)

                let user = rows[0]

                var salt = bcrypt.genSaltSync(10);
                //Compare the password 
                if (bcrypt.compareSync(password, user.password)) return done(null, user)
                else return done(null, false)
            }).catch(err => {
                console.log(err)
                return done(err, null)
            })
    }))

}