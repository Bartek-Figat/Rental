require("dotenv").config({ path: ".env" });
const sanitize = require("mongo-sanitize");
const CryptoJS = require("crypto-js");
const { findOneUser } = require("../db/db.user.controllers");
const { sign } = require("jsonwebtoken");
const { User } = require("../models/User");
const { secret } = process.env;
const saveUser = async (req, res, next) => {
  try{
    const { username, useremail, userpassword } = req.body;

  const { encrypt } = CryptoJS.AES;
  const hash = encrypt(`${sanitize(userpassword)}`, secret).toString();

  req.user = User.create({
    username: sanitize(username),
    userpassword: hash,
    useremail: sanitize(useremail),
    authToken: sign(
      {
        iat: new Date().getTime(),
      },
      `${secret}`
    ),
  });
  await next();

    
  }
  catch(error) {
    console.error(`Save User: ${error}`)
  }
  
};

module.exports = {
  saveUser,
};
