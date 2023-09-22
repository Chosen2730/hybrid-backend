//

const getAllCategories = async (req, res) => {
  res.send("all categories");
};
const getCategory = async (req, res) => {
  res.send("Single category");
};
const createCategory = async (req, res) => {
  res.send("Create category");
};
const updateCategory = async (req, res) => {
  res.send("update category");
};
const deleteCategory = async (req, res) => {
  res.send("update category");
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
