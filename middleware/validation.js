const validate = require("validate.js");
const { check, validationResult } = require('express-validator');


const registerValidation = [
  check(`username`, 'Name is required').not().isEmpty(),
  check(`useremail`, 'Please fill out a valid email address').isEmail(),
  check(`userpassword`, 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

const loginValidation = [
  check(`useremail`, 'Pease include valid email').isEmail(),
  check(`userpassword`, 'Password*').not().isEmpty(),
];

const postValidation = async (req, res, next) => {
  const constraints = {
    location: {
      presence: {
        allowEmpty: false,
      },
    },

    title: {
      presence: {
        allowEmpty: false,
      },
    },
    description: {
      presence: {
        allowEmpty: false,
      },
    },
    images: {
      presence: {
        allowEmpty: false,
      },
      length: {
        minimum: 1,
        maximum: 6,
      },
    },
    price: {
      presence: {
        allowEmpty: false,
      },
    },
    status: {
      presence: {
        allowEmpty: false,
      },
    },
    address: {
      presence: {
        allowEmpty: false,
      },
    },
    bedrooms: {
      presence: {
        allowEmpty: false,
      },
    },
    bathrooms: {
      presence: {
        allowEmpty: false,
      },
    },
    garages: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  try {
    const value = await validate(req.body, constraints);

    if (value) {
      res.status(422).json({ errors: value });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  postValidation,
};
