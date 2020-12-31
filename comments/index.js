const express = require("express");
const boydParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(boydParser.json());
const commentsByPostId = {};
const isBad = false;
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const {content} = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({id: commentId, content, status: "pending"});
  axios.post("http://event-bus-srv:4005/event", {
    type: "CommentCreated",
    data: {id: commentId, content, postId: req.params.id, status: "pending"},
  });
  commentsByPostId[req.params.id] = comments;
  res.send(commentsByPostId);
});

app.post("/events", async (req, res) => {
  console.log("ReceivedEvent", req.body.type);
  const {type, data} = req.body;
  if (type === "CommnetModerated") {
    const {postId, id, status, content} = data;
    const comments = commentsByPostId[data.postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = data.status;
    await axios.post("http://event-bus-srv:4005/event", {
      type: "CommentUpdated",
      data: {id, content, postId, status},
    });

    console.log("line 34", commentsByPostId[data.postId]);
  }

  res.send = {};
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
