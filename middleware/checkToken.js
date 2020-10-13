const { findAllJwt, insertJwt } = require('../db/db.jwt_blacklist.controllers');
const { Jwt } = require('../models/JwtBlackList');

const TokenExpired = async (req, res) => {
  try {
    const token = req.headers['x-access-token'] || req.headers['authorization'];
    const originalToken = [];
    originalToken.push(token);
    const tokenFromBlackList = await findAllJwt({});
    const compareToken = tokenFromBlackList.map((tokens) => {
      return tokens.jwtBlackList;
    });

    const findCommonElements = (arr1, arr2) => {
      return arr1.some((item) => arr2.includes(item));
    };

    if (findCommonElements(compareToken, originalToken) === true) {
      res.json({ msg: 'success true' });
    } else {
      const blackList = Jwt.createJwtBlackList({ jwtBlackList: token });
      await insertJwt(blackList);
      res.json({ msg: 'success false' });
    }
  } catch (error) {
    console.error(`Login Error:  ${error}`);
  }
};

module.exports = { TokenExpired };
