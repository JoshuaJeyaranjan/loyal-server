const bcrypt = require('bcrypt');
const password = 'Admin123!';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Hashed password:', hash);
});
