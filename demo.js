let bcrypt = require('bcryptjs')

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("12345", salt);
var hashpassword = bcrypt.hashSync("123456", salt);

console.log(hash)
console.log(hashpassword)

// Demo Code