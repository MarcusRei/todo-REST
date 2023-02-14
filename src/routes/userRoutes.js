const express = require("express");
const { userRoles } = require("../constants/userRoles");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userControllers");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authenticationMiddleware");

router.get("/", isAuthenticated, authorizeRoles(userRoles.ADMIN), getAllUsers);
router.get("/:userId", isAuthenticated, getUserById); //Kräver authentication
router.delete("/:userId", isAuthenticated, deleteUserById); //Kräver Admin eller egen användare

module.exports = router;
