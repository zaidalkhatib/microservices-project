const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.post("/events", async (req, res) => {
  const {type, data} = req.body;

  if (type === "CommentCreated") {
    const status =
      data.content.includes("ass") ||
      data.content.includes("fuck") ||
      data.content.includes("pussy") ||
      data.content.includes("nigga") ||
      data.content.includes("bitch")
        ? "rejected"
        : "approved";
    await axios.post("http://event-bus-srv:4005/event", {
      type: "CommnetModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status: status,
        content: data.content,
      },
    });
    // const post = posts[postId];
    res.send({});
  }
});
app.listen(4003, () => {
  console.log("listening on port 4003");
});
