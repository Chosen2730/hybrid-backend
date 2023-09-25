const { BadRequestError, NotFoundError } = require("../errors");
const Task = require("../model/taskSchema");
const Category = require("../model/categorySchema");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.find({
    createdBy: req.user.user_id,
    categoryID: id,
  });
  res.status(StatusCodes.OK).json(tasks);
};

const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    throw new NotFoundError("Task does not exist");
  }
  res.status(StatusCodes.OK).json(task);
};

const createTask = async (req, res) => {
  const isCategoryExisting = await Category.findOne({
    _id: req.body.categoryID,
  });
  if (!isCategoryExisting) {
    throw new NotFoundError("Category does not exist");
  }
  const task = await Task.create({
    ...req.body,
    createdBy: req.user.user_id,
  });
  res.status(StatusCodes.CREATED).json(task);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    throw new NotFoundError("Task does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Task updated successfully", task });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    throw new NotFoundError("Task does not exist");
  }
  res.status(StatusCodes.OK).json({ msg: "Task deleted successfully" });
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
