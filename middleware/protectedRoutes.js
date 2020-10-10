require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findAllJwt } = require("../db/db.jwt_blacklist.controllers");
const { secret } = process.env;

const protectedRoutes = async (req, res, next) => {
  //get token from the header
  const token = req.headers["x-access-token"] || req.headers["autorization"];

  const orginalToken = [];
  orginalToken.push(token);

  const tokenFromBlackList = await findAllJwt({});
  const compareToken = tokenFromBlackList.map((tokens) => {
    return tokens.jwtBlackList;
  });

  const findCommonElements = (arr1, arr2) => {
    return arr1.some((item) => arr2.includes(item));
  };

  if (!token || findCommonElements(compareToken, orginalToken) === true)
    return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Access denied" });
  }
};

module.exports = {
  protectedRoutes,
};
