"use strict";

var express = require("express");

var _require = require("crypto"),
    randomBytes = _require.randomBytes;

var bodyParser = require("body-parser");

var fileUpload = require("express-fileupload");

var cors = require("cors");

var app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cors());
var posts = {};
app.get("/posts", function (req, res) {
  res.send(posts);
});
app.post("/posts", function (req, res) {
  var id = randomBytes(4).toString("hex");
  var title = req.body.title;
  posts[id] = {
    id: id,
    title: title
  };
  res.send(posts[id]); // console.log(posts[id]);

  console.log(posts);
});
app.listen(4000, function () {
  console.log("listening on 4000");
});