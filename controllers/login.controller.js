
const { createLoginCredentials } = require("../routes/index");
const login = async (req, res, next) => {
  try {
    const credentials = req.body;
    const user = await createLoginCredentials(credentials, req, res, next);
    res.json({ user });
  } catch (error) {
    console.log(`Login Error:  ${error}`);
  }
}


module.exports = {
  login,
};