const express = require("express");
const router = express.Router();
const {
  getAllListsFromUser,
  getListById,
  createNewList,
  updateList,
  deleteList,
} = require("../controllers/listControllers");

//GET /api//v1/lists
router.get("/", getAllListsFromUser);
//GET /api/v1/lists
router.get("/:listId", getListById);
//POST /api/v1/lists - Create new list
router.post("/", createNewList);

//PUT /api/v1/lists/listId - Update list (by id)
router.put("/:listId", updateList);

//DELETE /api/v1/lists/:listId
router.delete("/:listId", deleteList);

module.exports = router;
