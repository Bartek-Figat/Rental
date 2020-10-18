const { validationResult } = require('express-validator');
const { createLoginCredentials } = require("../routes/index");
const { findOneUser } = require('../db/db.user.controllers');
const login = async (req, res, next) => {
  try {
    const { useremail } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const userEmailFound = await findOneUser({ useremail });

    if (!userEmailFound) {
      return res.status(400).json({ error: 'You have entered an invalid email or password' });
    } else if (userEmailFound.authToken !== null) {
      res.status(401).json({ error: 'Please confirm registration by email' });
    } else {
             const credentials = req.body;
             const user = await createLoginCredentials(credentials, req, res, next);
             res.json({ user });
    } 
  } catch (error) {
    res.status(500).json({ error: 'You have entered an invalid email or password' });
  }
}


module.exports = {
  login,
};