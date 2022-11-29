const express = require("express");
const chatService = require("../services/chatService");
const { convertBufferToBase64 } = require("../util");
const { formatDate } = require("../utils/utils");
const chatRouter = express.Router();

chatRouter.get("/createMessageTable", async (req, res) => {
  const data = await chatService.createMessageTable();
  if (data) {
    res.json("create table message successfully.");
  } else {
    res.json("fails to create table message.");
  }
});

chatRouter.get("/getAllMessages", async (req, res) => {
  try {
    const data = await chatService.getAllMessages();

    const result = data.map((d) => {
      if (d.user_avatar_url) {
        return {
          ...d,
          user_avatar_url: convertBufferToBase64(d.user_avatar_url),
          message_date: formatDate(d.message_date),
        };
      } else {
        return {
          ...d,
          user_avatar_url: "https://i.imgur.com/WTIETJ1.png",
          message_date: formatDate(d.message_date),
        };
      }
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

chatRouter.get("/getCurrentUserMessages", async (req, res) => {
  try {
    const data = await chatService.getCurrentUserMessages(req.session.user.id);

    const result = data.map((d) => {
      if (d.user_avatar_url) {
        return {
          ...d,
          user_avatar_url: convertBufferToBase64(d.user_avatar_url),
          message_date: formatDate(d.message_date),
        };
      } else {
        return {
          ...d,
          user_avatar_url: "https://i.imgur.com/WTIETJ1.png",
          message_date: formatDate(d.message_date),
        };
      }
    });

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

module.exports = chatRouter;
