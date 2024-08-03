const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../model");
const { Op } = require("sequelize");

const User = db.user;

const createUser = async (req, res) => {
  // console.log('req.body ', req.body);
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate JWT token
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '24h' });

  const user = await User.build({ email, password: hashedPassword, token });
  await user.save();

  res.status(201).json({message: "Signup success", token: user.toJSON(user).token});
};

const loginUser = async (req, res) => {
//   console.log("req.body ", req.body);

  const { email, password } = req.body;

  const userFound = await User.findOne({
    where: {
      email: {
        [Op.eq]: email,
      },
    },
  });

  if (!userFound) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ email: userFound.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
  userFound.token = token;
  await userFound.save();

  // Send response
  res.status(200).json({
    message: 'Login successful',
    token: userFound.token
  });
};

module.exports = {
  loginUser,
  createUser,
};
