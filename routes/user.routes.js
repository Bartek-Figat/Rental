const express = require("express");
const { ObjectID } = require("mongodb");
const {
  saveUser,
  registerValidatioin,
  loginValidatioin,
  createLoginCredentials,
  createAccountLimiter,
  loginAccountLimiter,
  insertUser,
  protectedRoutes,
  findOneUser,
  findAllPosts,
} = require("./index");
const { Router } = express;
const userRouter = Router();

userRouter.post(
  "/register",
  createAccountLimiter,
  registerValidatioin,
  saveUser,
  async (req, res, next) => {
    try {
      const userResponse = await insertUser(req.user);
      res.json({ userResponse });
    } catch (error) {
      console.log(`Register Error:  ${error}`);
    }
  }
);

userRouter.post(
  "/login",
  loginAccountLimiter,
  loginValidatioin,
  async (req, res, next) => {
    try {
      const credentials = req.body;
      const user = await createLoginCredentials(credentials, req, res, next);
      res.json({ user });
    } catch (error) {
      console.log(`Login Error:  ${error}`);
    }
  }
);

userRouter.get("/admin", protectedRoutes, async (req, res, next) => {
  try {
    const user = await findOneUser({ _id: ObjectID(req.user.data.id) });
    console.log(user._id);
    const userPost = await findAllPosts({ author: ObjectID(user._id) });
    const v = userPost.map((item) => {
      return item;
    });

    console.log(v);

    res.json({ user, userPost });
  } catch (error) {
    console.log(`Admin Error:  ${error}`);
  }
});

module.exports = { userRouter };
