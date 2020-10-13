const { ObjectID } = require("mongodb");
const { findOneUser,findAllPosts } = require("../routes/index");
const admin = async (req, res) => {
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
}

module.exports = {
  admin,
};