const User = require("../model/userSchema");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (users.length < 1) {
    return res.status(StatusCodes.OK).json({ msg: "No users found" });
  }
  res.status(StatusCodes.OK).json(users);
};

const signup = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequestError("Password and Confirm password do not match");
  }
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json(user);
};
const login = async (req, res) => {
  res.send("User login");
};

const getSingleUser = async (req, res) => {
  res.send("Single user");
};

const showUser = async (req, res) => {
  res.send("User shown");
};

const updateUser = async (req, res) => {
  res.send("User updated");
};

const deleteUser = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findOneAndDelete({ _id: user_id });
  if (!user) {
    throw new BadRequestError("User not found");
  }
  res.status(StatusCodes.OK).json({ msg: "User deleted" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  signup,
  updateUser,
  deleteUser,
  showUser,
  login,
};
