import ErrorHandler from "../error-handler/index.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/index.js";

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler(400, "User not found"));
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler(400, "Invalid credentials"));
  user.password = null;
  const token = generateAuthToken(user._id);
  res.json({ user, token });
};

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) return next(new ErrorHandler(400, "User already exists"));

  const user = new User({
    name,
    email,
    password,
  });
  await user.save();

  res.json({
    message: "User created successfully",
  });
};

const getMeController = async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate(["listings", "purchases"]);
  res.json({
    user,
  });
};

const generateAuthToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: "7d",
  });
};

export { loginController, registerController, getMeController };
