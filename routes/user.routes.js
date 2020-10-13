const express = require("express");
const {
  saveUser,
  registerValidation,
  loginValidation,
  loginAccountLimiter,
  protectedRoutes,
  TokenExpired
} = require("./index");
const {admin} = require("../controllers/admin.controller");
const {login} = require("../controllers/login.controller");
const {register} = require("../controllers/register.controller");
const {activate} = require("../controllers/activate.controller");
const { Router } = express;
const userRouter = Router(); 


userRouter.post("/register", registerValidation, saveUser, register);

userRouter.post("/login", loginAccountLimiter, loginValidation, login);


userRouter.get("/admin", protectedRoutes, admin);

userRouter.get("/logout", TokenExpired);

userRouter.get("/activate/:token", activate);

module.exports = { userRouter };
