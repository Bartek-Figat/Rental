require("dotenv").config({ path: ".env" });
const sanitize = require("mongo-sanitize");
const CryptoJS = require("crypto-js");
const { sign } = require("jsonwebtoken");
const { User } = require("../models/User");
const { secret } = process.env;
const saveUser = async (req, res, next) => {
  console.log(req.body);
  const { username, useremail, userpassword } = req.body;

  const query = {
    username: sanitize(username),
    useremail: sanitize(useremail),
    userpassword: sanitize(userpassword),
  };
  const { encrypt } = CryptoJS.AES;
  const hash = encrypt(`${query.userpassword}`, `${secret}`).toString();

  req.user = User.create({
    username: query.username,
    userpassword: hash,
    useremail: query.useremail,
  });
  next();
};

module.exports = {
  saveUser,
};
