"use strict";

var express = require("express");

var boydParser = require("body-parser");

var _require = require("crypto"),
    randomBytes = _require.randomBytes;

var cors = require("cors");

var app = express();
app.use(cors());
app.use(boydParser.json());
var commentsByPostId = {};
app.get("/posts/:id/comments", function (req, res) {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", function (req, res) {
  var commentId = randomBytes(4).toString("hex");
  var content = req.body.content;
  var comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id: commentId,
    content: content
  });
  commentsByPostId[req.params.id] = comments;
  res.send(commentsByPostId);
  console.log(commentsByPostId);
});
app.listen(4001, function () {
  console.log("listening on port 4001");
});