const User = require("../model/userSchema");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const deleteImage = require("../middlewares/deleteImage");
const uploadImage = require("../middlewares/imageUploader");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (users.length < 1) {
    return res.status(StatusCodes.OK).json({ msg: "No users found" });
  }
  res.status(StatusCodes.OK).json(users);
};

const signup = async (req, res) => {
  const { password, confirmPassword, email } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequestError("Password and Confirm password do not match");
  }
  const user = await User.create({ ...req.body, email: email.toLowerCase() });
  const token = await user.createJWT();
  // console.log(user);
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password must be provided");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
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
    user: {
      user_id: user._id,
    },
  });
};

const getSingleUser = async (req, res) => {
  const { user_id } = req.params;
  const user = await User.findOne({ _id: user_id });

  if (!user) {
    throw new BadRequestError(`User does not exist`);
  }
  const currentUser = {
    fullName: user.fullName,
    tel: user.tel,
    email: user.email,
    backupEmail: user.backupEmail,
    user_id: user._id,
    profileImage: user.image.url,
  };

  res.status(200).json(currentUser);
};

const showUser = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  let update = req.body;

  const user = await User.findOne({ _id: user_id });

  if (!user) {
    throw new BadRequestError(`User does not exist`);
  }
  const {
    image: { imageId },
  } = user;

  const newImg = req.files?.image;
  // console.log(newImg);
  if (newImg) {
    if (imageId) {
      await deleteImage(imageId);
    }

    const { public_id, secure_url } = await uploadImage(req, "user");
    update = { ...req.body, image: { url: secure_url, imageId: public_id } };
  }

  const newUser = await User.findOneAndUpdate({ _id: user_id }, update, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    updatedUser: {
      fullName: newUser.fullName,
      tel: newUser.tel,
      email: newUser.email,
      user_id: newUser._id,
      profileImage: newUser.image.url,
    },
    msg: "Profile successfully updated",
  });
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
