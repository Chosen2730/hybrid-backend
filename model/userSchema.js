const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name field is required"],
      trim: true,
    },
    tel: {
      type: String,
      required: [true, "Phone Number field is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ["Please provide a valid email"],
      ],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      minLength: 6,
      maxLength: 12,
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password field is required"],
      minLength: 6,
      maxLength: 12,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
});

module.exports = model("User", UserSchema);
