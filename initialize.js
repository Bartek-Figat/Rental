require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require('morgan');
const compression = require("compression");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const initialize = () => {
  const server = express();
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(morgan("dev"));
  server.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  server.use(helmet());
  server.use(compression());
  server.use(userRouter);
  server.use(postRouter);
  return server;
};


module.exports = {
  initialize,
};
