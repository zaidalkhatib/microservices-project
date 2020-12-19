const express = require("express");
const boydParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(boydParser.json());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const {content} = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({id: commentId, content});
  commentsByPostId[req.params.id] = comments;
  res.send(commentsByPostId);
  console.log(commentsByPostId);
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
