//Require the mysql node module
const mysql = require('mysql2');

//Create the app connection for the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'login'
});

module.exports = {
    findById: function(id) {
        return connection.promise().query('select * from users where id=?', [id])
    },

    findByUsername: function(username) {
        return connection.promise().query('select * from users where login=?', [username])
    }
}

//Shows the data of the database (Only for the dev)
connection.query('Select * from users', (error, result, fields) => {
    console.log(result)
})