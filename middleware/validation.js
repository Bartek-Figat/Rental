const { check } = require('express-validator');


const registerValidation = [
  check(`username`, 'Name is required').not().isEmpty(),
  check(`useremail`, 'Please fill out a valid email address').isEmail(),
  check(`userpassword`, 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

const loginValidation = [
  check(`useremail`, 'Pease include valid email').isEmail(),
  check(`userpassword`, 'Password').not().isEmpty(),
];



module.exports = {
  registerValidation,
  loginValidation,
};
