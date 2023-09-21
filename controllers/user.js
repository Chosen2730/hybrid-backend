//

const getAllUsers = (req, res) => {
  res.send("All users");
};

const getSingleUser = (req, res) => {
  res.send("Single user");
};

const showUser = (req, res) => {
  res.send("User shown");
};

const signup = (req, res) => {
  res.send("User created");
};
const login = (req, res) => {
  res.send("User login");
};

const updateUser = (req, res) => {
  res.send("User updated");
};

const deleteUser = (req, res) => {
  res.send("User deleted");
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
