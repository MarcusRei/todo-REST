const { BadRequestError, UnauthenticatedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { userRoles } = require("../constants/userRoles");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new BadRequestError(
      "Du måste skriva in ett användarnamn, en email och ett lösenord, idiot!"
    );
  }

  //Krypterar lösenordet
  const salt = await bcrypt.genSalt(8);
  const hashedpassword = await bcrypt.hash(password, salt);

  const newUser = {
    username,
    email,
    password: hashedpassword,
  };

  //Gör den första användaren till admin
  const usersInDb = await User.countDocuments();
  if (usersInDb === 0) newUser.role = userRoles.ADMIN;

  await User.create(newUser);

  return res.status(201).json({
    message:
      "Grattis du har registrerat en användare, nu får du fan ta och logga in också!",
  });
};

exports.login = async (req, res) => {
  const { email, password: candidatePassword } = req.body;

  //Kollar att vi skickat in korrekt information
  if (!email || !candidatePassword) {
    throw new BadRequestError(
      "Du måste ge mig en email och ett lösenord för att logga in! jeeeeesus..."
    );
  }

  //Kollar om emailen redan används
  const user = await User.findOne({ email: email });
  if (!user)
    throw new UnauthenticatedError("Den här finns ju inte fööör faaAN!!");

  //Kollar om lösenordet är korrekt
  const isPasswordCorrect = await bcrypt.compare(
    candidatePassword,
    user.password
  );
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Fel fucking lösenord bror!!");

  //Skapa en JWT payload
  const jwtPayload = {
    userId: user._id,
    role: user.role,
    username: user.username,
  };

  //Skapar vårt token
  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({ token: jwtToken, user: jwtPayload });
};
