const express = require("express");
const { lookup } = require("geoip-lite");

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
  Jwt,
  insertJwt,
} = require("./index");
const { Router } = express;
const userRouter = Router();

userRouter.post(
  "/register",
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
    const userPost = await findAllPosts({ author: ObjectID(user._id) });
    const allUserPosts = userPost.map((item) => {
      return item;
    });

    if (allUserPosts.length === 0) {
      res.json({ msg: "No post added" });
    } else {
      res.json({ allUserPosts });
    }
  } catch (error) {
    console.log(`Admin Error:  ${error}`);
  }
});

userRouter.get("/logout", async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.headers["autorization"];
    const blackList = Jwt.createJwtBlackList({ jwtBlackList: token });

    await insertJwt(blackList);
    res.json({ msg: "success" });
  } catch (error) {
    console.log(`Login Error:  ${error}`);
  }
});

module.exports = { userRouter };
