const List = require("../models/List");

exports.getAllListsFromUser = async (req, res) => {
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

exports.createNewList = async (req, res) => {
  try {
    //Get data from req.body
    const listName = req.body.listName;
    const todos = req.body.todos;

    //If (no name) respond bad request
    if (!listName) {
      return res.status(400).json({
        message: "Ge listan ett namn!",
      });
    }

    if (todos === "") {
      todos = [];
    }

    //Create list object
    const newList = await List.create({
      listName: listName,
      todos: todos,
    });

    //Respond
    return res
      .setHeader(
        "location",
        `http://localhost:${process.env.PORT}/api/v1/users/${newList._id}`
      )
      .status(201)
      .json(newList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
exports.updateList = async (req, res) => {};
exports.deleteList = async (req, res) => {};
