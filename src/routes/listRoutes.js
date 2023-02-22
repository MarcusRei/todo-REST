const express = require("express");
const router = express.Router();
const {
  getAllListsFromUser,
  getListById,
  createNewList,
  updateList,
  deleteList,
} = require("../controllers/listControllers");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authenticationMiddleware");

//GET /api//v1/lists
router.get("/", getAllListsFromUser);
//GET /api/v1/lists
router.get("/:listId", getListById);
//POST /api/v1/lists - Create new list
router.post("/", isAuthenticated, createNewList);

//PUT /api/v1/lists/listId - Update list (by id)
router.put("/:listId", updateList);

//DELETE /api/v1/lists/:listId
router.delete("/:listId", deleteList);

module.exports = router;
