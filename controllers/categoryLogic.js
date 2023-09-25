const { BadRequestError, NotFoundError } = require("../errors");
const Category = require("../model/categorySchema");
const { StatusCodes } = require("http-status-codes");

const getAllCategories = async (req, res) => {
  const categories = await Category.find({
    createdBy: req.user.user_id,
  }).populate("tasks");
  res.status(StatusCodes.OK).json(categories);
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({ _id: id }).populate("tasks");
  if (!category) {
    throw new NotFoundError("Category does not exist");
  }
  res.status(StatusCodes.OK).json(category);
};

const getColors = async (req, res) => {
  const colors = Category.schema.path("color").enumValues;
  res.status(StatusCodes.OK).json(colors);
};

const createCategory = async (req, res) => {
  const categoryData = {
    ...req.body,
    createdBy: req.user.user_id,
  };

  const category = await Category.create(categoryData);
  res.status(StatusCodes.CREATED).json(category);
};

const updateCategory = async (req, res) => {
  res.send("update category");
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOneAndRemove({ _id: id });
  if (!category) {
    throw new NotFoundError("Category does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Category deleted successfully" });
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getColors,
};
