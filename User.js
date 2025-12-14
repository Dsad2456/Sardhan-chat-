const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  online: Boolean,
  lastSeen: Date
});

module.exports = mongoose.model("User", UserSchema);
