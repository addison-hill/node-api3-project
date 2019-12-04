const express = require("express");
const helmet = require("helmet");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use("/users", userRouter);
server.use("/users/:id/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

module.exports = server;
