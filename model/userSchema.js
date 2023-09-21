const { model, Schema } = require("mongoose");
const UserSchema = new Schema({
  userName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ["Please provide a valid email"],
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 12,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 12,
  },
});

module.exports = model("User", UserSchema);
