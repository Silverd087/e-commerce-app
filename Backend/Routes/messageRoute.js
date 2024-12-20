const express = require("express");
const messageRoute = express.Router();
const {
  getMessages,
  getOneMessage,
  postMessage,
  putMessage,
  handleSendReply,
} = require("../Controllers/messageController");

messageRoute.get("/messages", getMessages);
messageRoute.get("/messages/:id", getOneMessage);
messageRoute.post("/messages", postMessage);
messageRoute.put("/messages/:id", putMessage);
messageRoute.post("/messages/reply", handleSendReply);

module.exports = messageRoute;
