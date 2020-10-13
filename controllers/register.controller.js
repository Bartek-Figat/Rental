const { insertUser, findOneUser } = require('../routes/index');
const { sendEmailVerification } = require('../controllers/email.controller');
const register = async (req, res, next) => {
  try {
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
