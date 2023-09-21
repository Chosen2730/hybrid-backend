const {
  getAllUsers,
  getSingleUser,
  signup,
  updateUser,
  deleteUser,
  showUser,
  login,
} = require("../controllers/user");
const router = require("express").Router();

router.get("/").get(getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.get("/show-user", showUser);
router
  .route("/:user_id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
