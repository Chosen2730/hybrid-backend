const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new Schema(
  {
    image: {
      url: String,
      imageId: String,
    },
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

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      user: {
        fullName: this.fullName,
        email: this.email,
        tel: this.tel,
        user_id: this._id,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = model("User", UserSchema);
