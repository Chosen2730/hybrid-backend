const User = require("../model/userSchema");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

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
  const token = await user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password must be provided");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User does not exist in our database");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Wrong Password");
  }
  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({
    token,
    user: { fullName: user.fullName, tel: user.tel, email: user.email },
  });
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
    throw new NotFoundError("User not found");
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
