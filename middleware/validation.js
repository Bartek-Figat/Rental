const validate = require("validate.js");

const registerValidation = async (req, res, next) => {
  const constraints = {
    username: {
      presence: {
        allowEmpty: false,
        message: '^Name required',
      },
    },
    userpassword: {
      presence: true,
      length: {
        minimum: 6,
        message: '^Password must be at least 6 characters',
      },
    },
    useremail: {
      email: true,
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

const loginValidation = async (req, res, next) => {
  const constraints = {
    userpassword: {
      presence: true,
      length: {
        minimum: 6,
        message: '^Password must be at least 6 characters',
      },
    },
    useremail: {
      email: {
        message: "^Email doesn't look like a valid email",
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
