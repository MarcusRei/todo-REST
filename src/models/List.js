const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  todos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },
});

module.exports = mongoose.model("List", ListSchema);
