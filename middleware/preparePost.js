require("dotenv").config();
const sanitize = require("mongo-sanitize");
const cloudinary = require("cloudinary");
const { ObjectID } = require("mongodb");
const { Post } = require("../models/Post");
const { cloud_name, api_key, api_secret } = process.env;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const preparePost = async (req, res, next) => {
  const {
    location,
    title,
    description,
    gallery,
    price,
    status,
    bedrooms,
    bathrooms,
    garages,
  } = req.body;

  const clientImages = await cloudinary.uploader
    .upload(gallery)
    .map((result) => {
      return result.secure_url;
    });

  req.post = Post.createPost({
    location: sanitize(location),
    author: ObjectID(req.user.data.id),
    title: sanitize(title),
    description: sanitize(description),
    gallery: clientImages,
    price: sanitize(price),
    status: sanitize(status),
    bedrooms: sanitize(bedrooms),
    bathrooms: sanitize(bathrooms),
    garages: sanitize(garages),
  });

  await next();
};

module.exports = { preparePost };
