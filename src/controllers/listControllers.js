const List = require("../models/List");

exports.getAllLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find();

    const totalTodoListsInDatabase = await TodoList.countDocuments();

    return res.json({
      data: todoLists,
      meta: {
        total: totalTodoListsInDatabase,
        count: todoLists.length,
      },
    });
  } catch (error) {}
};

exports.getListById = async (req, res) => {};
exports.createNewList = async (req, res) => {};
exports.updateList = async (req, res) => {};
exports.deleteList = async (req, res) => {};
