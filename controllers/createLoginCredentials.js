require("dotenv").config();
const CryptoJS = require("crypto-js");
const { ObjectID } = require("mongodb");
const { findOneUser, findOneAndUpdate } = require("../db/db.user.controllers");
const jwt = require("jsonwebtoken");
const { secret } = process.env;

const createLoginCredentials = async (credentials, req, res, next) => {
  const { useremail, userpassword } = credentials;

  const user = await findOneUser({ useremail });

  if (user === null) {
    res
      .status(401)
      .json({ error: "You have entered an invalid email or password" });
  } else {
    const { decrypt } = CryptoJS.AES;
    // Decrypt
    const bytes = decrypt(user.userpassword, `${secret}`);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== userpassword) {
      res
        .status(401)
        .json({ error: "You have entered an invalid email or password" });
    } else {
      await findOneAndUpdate(
        { useremail },
        { $set: { lastLoggedIn: new Date() } }
      );
      return {
        accessToken: jwt.sign(
          {
            data: {
              user: user.useremail,
              id: ObjectID(user._id),
            },
          },
          `${secret}`
        ),
      };
    }
  }
};

module.exports = {
  createLoginCredentials,
};
