const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
