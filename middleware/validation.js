const validate = require("validate.js");

const registerValidatioin = async (req, res, next) => {
  const constraints = {
    username: {
      presence: {
        allowEmpty: false,
      },
    },
    userpassword: {
      presence: true,
      length: {
        minimum: 6,
        message: "must be at least 6 characters",
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

const loginValidatioin = async (req, res, next) => {
  const constraints = {
    userpassword: {
      presence: true,
      length: {
        minimum: 5,
        message: "must be at least 6 characters",
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

const postValidatioin = async (req, res, next) => {
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
  registerValidatioin,
  loginValidatioin,
  postValidatioin,
};
