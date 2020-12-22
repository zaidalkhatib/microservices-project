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
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
  axios.post("http://localhost:4003/events", event);
  res.send({status: "Ok"});
});

app.get("/event", (req, res) => {
  console.log("this was called");
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening to 4005");
});
