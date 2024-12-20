const Message = require("../models/Message");
const nodemailer = require("nodemailer");
require('dotenv').config();

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    if (messages && messages.length > 0) {
      res.status(200).json({ messages: messages });
    } else {
      res.status(404).json({ msg: "No messages found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error on getting messages" });
  }
};

const getOneMessage = async (req, res) => {
  const id = req.params.id;
  try {
    const foundMessage = await Message.findById(id);
    if (foundMessage) {
      res.status(200).json({ message: foundMessage });
    } else {
      res.status(404).json({ msg: "No message found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error on retrieving the message" });
  }
};

const postMessage = async (req, res) => {
  const message = req.body;
  try {
    const newMessage = new Message(message);
    console.log(newMessage);
    await newMessage.save();
    res
      .status(200)
      .json({ message: newMessage, msg: "message successfully added" });
  } catch (error) {
    res.status(500).json({ msg: "error on adding the message" });
  }
};

const putMessage = async (req, res) => {
  const id = req.params.id;
  const message = req.body;
  console.log(message);
  try {
    await Message.findByIdAndUpdate(id, message);
    res.status(200).json({ msg: "update success" });
  } catch (error) {
    res.status(500).json({ msg: "error on updating the message" });
  }
};

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};

const handleSendReply = async (req, res) => {
  const { messageId, reply } = req.body;

  console.log("Received messageId:", messageId);
  console.log("Received reply:", reply);

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      console.log("Message not found");
      return res.status(404).json({ msg: "Message not found" });
    }

    await sendEmail(message.from, "Your Reply", reply);
    message.reply = reply;
    await message.save();

    res.status(200).json({ msg: "Reply sent and email sent successfully!" });
  } catch (error) {
    console.error("Failed to send reply:", error);
    res.status(500).json({ msg: "Failed to send reply." });
  }
};

module.exports = {
  getMessages,
  getOneMessage,
  postMessage,
  putMessage,
  handleSendReply,
};
