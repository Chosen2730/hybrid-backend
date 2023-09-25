const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getColors,
} = require("../controllers/categoryLogic");
const router = require("express").Router();

router.route("/").get(getAllCategories).post(createCategory);
router.get("/colors", getColors);
router
  .route("/:id")
  .get(getCategory)
  .delete(deleteCategory)
  .patch(updateCategory);

module.exports = router;
