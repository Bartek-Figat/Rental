const { saveUser } = require("../middleware/saveUser");
const { preparePost } = require("../middleware/preparePost");
const { registerValidation, loginValidation, postValidation } = require('../middleware/validation');
const { protectedRoutes } = require("../middleware/protectedRoutes");
const {
  createLoginCredentials,
} = require("../controllers/createLoginCredentials");
const {
  createAccountLimiter,
  loginAccountLimiter,
} = require("../middleware/reqLimit");


const { TokenExpired } = require('../middleware/checkToken');

const {
  insertUser,
  findOneUser,
  findAllUsers,
  updateOneUsers,
  findOneAndUpdate,
} = require("../db/db.user.controllers");

const {
  insertPost,
  findOnePost,
  findAllPosts,
} = require("../db/db.post.controllers");

const {
  insertJwt,
  findOneJwt,
  findAllJwt,
} = require("../db/db.jwt_blacklist.controllers");

const { Jwt } = require("../models/JwtBlackList");

module.exports = {
  saveUser,
  registerValidation,
  loginValidation,
  createLoginCredentials,
  createAccountLimiter,
  loginAccountLimiter,
  insertUser,
  protectedRoutes,
  preparePost,
  findOneUser,
  findAllUsers,
  insertPost,
  findOnePost,
  findAllPosts,
  updateOneUsers,
  findOneAndUpdate,
  postValidation,
  insertJwt,
  findOneJwt,
  findAllJwt,
  Jwt,
  TokenExpired,
};
