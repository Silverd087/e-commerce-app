const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: false,
  },
  read: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
