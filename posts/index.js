const express = require("express");
const {randomBytes} = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());
const posts = {};


app.post("/posts/create", async (req, res) => {
  console.log("recived")
  const id = randomBytes(4).toString("hex");
  const {title} = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-srv:4005/event", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.send(posts[id]);
  console.log(posts);
});

app.post("/events", (req, res) => {
  console.log("RecevedEvent", req.body.type);
  res.send = {};
});

app.listen(4000, () => {

  console.log("v55");
  
  console.log("listening on 4000 and wha'ts up");
});
