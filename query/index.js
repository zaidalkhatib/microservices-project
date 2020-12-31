const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const handleEvent = (data, type) => {
  if (type === "PostCreated") {
    const {id, title} = data;
    posts[id] = {id, title, comments: []};
  }
  if (type === "CommentCreated") {
    const {id, content, postId, status} = data;
    const post = posts[postId];
    post.comments.push({id, content, status});
  }
  if (type === "CommentUpdated") {
    const {id, content, postId, status} = data;
    const comments = posts[postId].comments;
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const {type, data} = req.body;

  handleEvent(data, type);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listeing on 4002");
  const res = await axios.get("http://event-bus-srv:4005/events");
  console.log(res.data);
  for (let e of res.data) {
    handleEvent(e.data, e.type);
  }
});
