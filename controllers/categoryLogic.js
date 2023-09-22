const { BadRequestError, NotFoundError } = require("../errors");
const Category = require("../model/categorySchema");
const { StatusCodes } = require("http-status-codes");

const getAllCategories = async (req, res) => {
  const categories = await Category.find({ createdBy: req.user.user_id });
  if (categories.length < 1) {
    return res
      .status(StatusCodes.OK)
      .json({ msg: "You have no category created" });
  }
  res.status(StatusCodes.OK).json(categories);
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id });
  if (!category) {
    throw new NotFoundError("Category does not exist");
  }
  res.status(StatusCodes.OK).json(category);
};

const createCategory = async (req, res) => {
  const category = await Category.create({
    ...req.body,
    createdBy: req.user.user_id,
  });
  res.status(StatusCodes.CREATED).json(category);
};

const updateCategory = async (req, res) => {
  res.send("update category");
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOneAndDelete({ _id: id });
  if (!category) {
    throw new NotFoundError("Category does not exist");
  }
  console.log(category);
  res.status(StatusCodes.OK).json({ msg: "Category deleted successfully" });
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
