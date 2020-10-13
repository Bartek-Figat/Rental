const express = require("express");
const { ObjectID } = require("mongodb");
const { Router } = express;
const postRouter = Router();

const {
  preparePost,
  protectedRoutes,
  insertPost,
  findOneAndUpdate,
  postValidation,
} = require('./index');

postRouter.post('/post', protectedRoutes, postValidation, preparePost, async (req, res) => {
  try {
    const postResponse = await insertPost(req.post);

    await findOneAndUpdate(
      { _id: ObjectID(req.user.data.id) },
      { $push: { posts: ObjectID(postResponse.ops[0]._id) } }
    );

    res.json({ postResponse });
  } catch (error) {
    console.log(`Error from post: ${error}`);
  }
});

module.exports = { postRouter };
