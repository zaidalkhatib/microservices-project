const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const events = [];
app.use("/event", (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("event is ", events);
  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-srv:4001/events", event);
  axios.post("http://moderation-srv:4003/events", event);
  axios.post("http://query-srv:4002/events", event);
  res.send({status: "Ok"});
});

app.get("/events", (req, res) => {
  res.send(events);
  console.log("this was called");
});

app.listen(4005, () => {
  console.log("listening to 4005");
});
