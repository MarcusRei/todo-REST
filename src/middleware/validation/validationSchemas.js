const { body } = require("express-validator");

exports.registerSchema = [
  body("email")
    .isEmail()
    .withMessage("Du måste ge mig en riktig email kompis!"),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Ditt lösenord måste innehålla minst 6 tecken"),
  body("username")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 15 })
    .withMessage("Ditt användarnamn måste vara mellan 3 och 15 tecken långt!"),
];

exports.loginSchema = [
  body("email")
    .isEmail()
    .withMessage("Du måste ge mig en riktig email kompis!"),
  body("password").not().isEmpty().withMessage("Ge mig ett lösenord!"),
];
