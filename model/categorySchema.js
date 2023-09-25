const { model, Schema } = require("mongoose");
const Task = require("./taskSchema");

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    color: {
      type: String,
      required: true,
      enum: [
        "#FF916A",
        "#59ADFF",
        "#D2FF9A",
        "#6AFFF6",
        "#FFBB6A",
        "#092794",
        "#2FFF44",
        "#FB3EFF",
      ],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "categoryID",
  justOne: false,
});

CategorySchema.pre("findOneAndRemove", async function (next) {
  const categoryId = this._conditions._id.toString();
  try {
    const data = await Task.find({ categoryID: categoryId });
    const res = await Task.deleteMany({ categoryID: categoryId });
  } catch (error) {
    console.error(error);
  }
});

const Category = model("Category", CategorySchema);

module.exports = Category;
