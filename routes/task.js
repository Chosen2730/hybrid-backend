const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskLogic");

const router = require("express").Router();

router.route("/").post(createTask);
router.get("/:id", getAllTasks);
router.route("/:id").get(getTask).delete(deleteTask).patch(updateTask);

module.exports = router;
