const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createNewTodo,
  updateTodo,
  deleteTodoById,
} = require("../controllers/todoController");

//GET /api/v1/todos - Get all todos
router.get("/", getAllTodos);

//GET /api/v1/todos/:todoId - Get todo by id
router.get("/:todoId", getTodoById);

//POST /api/v1/todos - Create new todos
router.post("/", createNewTodo);

//PUT /api/v1/todos/todoId - Update todo (by id)
router.put("/:todoId", updateTodo);

//DELETE /api/v1/todos/:todoId
router.delete("/:todoId", deleteTodoById);

module.exports = router;
