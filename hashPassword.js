// const bcrypt = require('bcrypt');
const password = 'Admin123!';
const saltRounds = 10;

// bcrypt.hash(password, saltRounds, function(err, hash) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Hashed password:', hash);
// });



const crypto = require('crypto');

// Hashing
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Comparison (if needed)
const isPasswordMatch = (password, hashedPassword) => {
    return hashPassword(password) === hashedPassword;
};
