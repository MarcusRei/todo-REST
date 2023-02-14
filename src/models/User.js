const mongoose = require("mongoose");
const { userRoles } = require("../constants/userRoles");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.USER,
  },
  lists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Todo",
  },
});

module.exports = mongoose.model("User", UserSchema);
