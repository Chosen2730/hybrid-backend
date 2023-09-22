const { model, Schema } = require("mongoose");
// const Task = require("./taskSchema");
const CategorySchema = new Schema({
  title: { type: String, required: true },
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
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  createdBy: { type: Schema.ObjectId, ref: "User" },
});

module.exports = model("Category", CategorySchema);
