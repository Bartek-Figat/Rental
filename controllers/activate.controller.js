const { updateAccountAfterEmailConfirmation } = require('../controllers/email.controller');
const activate = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      res.status(400).json({
        error: 'Something went wrong',
      });
    } else {
      const registerResult = await updateAccountAfterEmailConfirmation(token, req, res, next);
      res.json(registerResult);
    }
  } catch (err) {
    res.status(400).json({
      error: 'Something went wrong',
    });
  }
};

module.exports = {
  activate,
};
