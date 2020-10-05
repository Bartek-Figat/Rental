require("dotenv").config();
const jwt = require("jsonwebtoken");

const { secret } = process.env;

const protectedRoutes = async (req, res, next) => {
  //get token from the header
  const token = req.headers["x-access-token"] || req.headers["autorization"];

  if (!token) return res.status(401).json({ error: "Access denied" });

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
