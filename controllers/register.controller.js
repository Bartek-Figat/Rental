const { validationResult } = require('express-validator');
const { insertUser, findOneUser } = require('../routes/index');
const { sendEmailVerification } = require('../controllers/email.controller');
const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { useremail } = req.user;
    const userEmailFound = await findOneUser({ useremail });
    if (userEmailFound) {
      res.status(400).json({
        error: 'Something went wrong',
      });
    } else {
      const emailResponse = await sendEmailVerification(req.user);
      const userResponse = await insertUser(req.user);
      res.json({ userResponse, emailResponse });
    }
  } catch (error) {
    console.log(`Register Error:  ${error}`);
  }
};

module.exports = {
  register,
};
