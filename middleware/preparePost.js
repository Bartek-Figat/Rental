require("dotenv").config();
const sanitize = require("mongo-sanitize");
const { ObjectID } = require("mongodb");
const { Post } = require("../models/Post");

const preparePost = async (req, res, next) => {
  const { location, author, title, description, street, city } = req.body;

  const query = {
    location: sanitize(location),
    title: sanitize(title),
    description: sanitize(description),
    street: sanitize(street),
    city: sanitize(city),
  };
  req.post = Post.createPost({
    location: query.location,
    author: ObjectID(req.user.data.id),
    title: query.title,
    description: query.description,
    street: query.street,
    city: query.city,
  });

  await next();
};

module.exports = { preparePost };
