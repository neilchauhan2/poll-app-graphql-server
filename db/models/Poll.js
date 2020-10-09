const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Poll = mongoose.model("Poll", PollSchema);

module.exports = {
  Poll
};