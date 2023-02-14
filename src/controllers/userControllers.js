const { userRoles } = require("../constants/userRoles");
const User = require("../models/User");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");

exports.getAllUsers = async (req, res) => {
  const users = await User.find()
    .sort({ createdAt: "desc" })
    //gör så att lösenord inte visas
    .select("-password");

  return res.json(users);
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).select("-password");

  if (!user)
    throw new NotFoundError(
      "Finns ingen användare med ett sånt här Id...idiot"
    );

  return res.json(user);
};

exports.createUser = async (req, res) => {};

exports.deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  const user = await user.findById(userId);

  //Du kan bara ta bort dig själv om du inte är admin
  if (!req.user?.role !== userRoles.ADMIN && userId !== req.user?.userId)
    throw new UnauthorizedError(
      "Vänta nu... Du får ju inte ta bort den här! Du är inte admin din lilla gris!"
    );

  await user.delete();

  return res.sendStatus(204);
};
