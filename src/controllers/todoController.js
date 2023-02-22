const Todo = require("../models/Todo");
const List = require("../models/List");

exports.getAllTodos = async (req, res) => {
  try {
    const limit = Number(req.query?.limit || 10);

    const offset = Number(req.query?.offset || 0);

    const todos = await Todo.find().limit(limit).skip(offset);

    const totalTodosInDatabase = await Todo.countDocuments();

    return res.json({
      data: todos,
      meta: {
        total: totalTodosInDatabase,
        limit: limit,
        offset: offset,
        count: todos.length,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    todoId = req.params.todoId;

    const todo = await Todo.findById(todoId);

    if (!todo) return res.sendStatus(404);

    return res.json(todo);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createNewTodo = async (req, res) => {
  try {
    //Get data from req.body
    const title = req.body.title;
    const success = false;
    const listId = req.body.listId;

    //if (no name || name is empty string) respond bad request
    if (!title) {
      return res.status(400).json({
        message: "Du måste ju skriva nåt i din todo... vafan",
      });
    }

    //Get list object
    const listToUpdate = await List.findById(listId);

    return res.json(listToUpdate);

    //Create todo object
    /* const newTodo = await Todo.create({
      title: title,
      success: success,
      listId: listId,
    }); */

    //listToUpdate.todos.splice(0, todo._id);

    //Respond
    //return listToUpdate;
    /* return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/users/todos/${newTodo._id}`
      )
      .status(201)
      .json(newTodo); */
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    //Parametrar som kan ändras
    let { title, success } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Du har ju inte sagt vad jag ska ändra!",
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        message: "För kort! Kortis!",
      });
    }

    const todoToUpdate = await Todo.findById(todoId);

    //Om todo inte finns
    if (!todoToUpdate) {
      return res.sendStatus(404).json({
        message: "Den här todon finns inte din lilla...",
      });
    }

    //Om det finns en title uppdateras den här
    if (title) {
      todoToUpdate.title = title;
    }

    //Om success finns ändras den
    if (success === true) {
      todoToUpdate.success = true;
    }

    if (success === false) {
      todoToUpdate.success = false;
    }

    const updatedTodo = await todoToUpdate.save();

    return res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTodoById = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todoToDelete = await Todo.findById(todoId);

    if (!todoToDelete) {
      return res.sendStatus(404).json({
        message: "Ser det ut som att jag kan ta bort något som inte finns?!",
      });
    }

    await todoToDelete.delete();

    return res.sendStatus(204).json({
      message: "Grattis! du tog bort en todo, du har pajat databasen...",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
