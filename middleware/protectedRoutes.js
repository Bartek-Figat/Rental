require("dotenv").config();
const jwt = require("jsonwebtoken");
const { findAllJwt, insertJwt } = require("../db/db.jwt_blacklist.controllers");
const { Jwt } = require("../models/JwtBlackList")
const { secret } = process.env;

const protectedRoutes = async (req, res, next) => {

  try {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    const originalToken = [];
    originalToken.push(token);
  
    const tokenFromBlackList = await findAllJwt({});
    const compareToken = tokenFromBlackList.map((tokens) => {
      return tokens.jwtBlackList;
    });
  
    const findCommonElements = (arr1, arr2) => {
      return arr1.some((item) => arr2.includes(item));
    };
  
    if (!token || findCommonElements(compareToken, originalToken) === true)
      return res.status(401).json({ error: "Access denied" });
    jwt.verify(token, secret,async (err, decoded) => {
      if (err) {
            res.status(401).json({ error: 'Access denied' });
      }else{
        req.user = decoded;
      }
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Access denied" });
  }
};

module.exports = {
  protectedRoutes,
};
