const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  description: {
    type: String,
    maxLength: 500,
  },
  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
    required: true,
  },
});

module.exports = mongoose.model("List", ListSchema);
