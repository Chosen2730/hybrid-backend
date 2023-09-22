const { model, Schema } = require("mongoose");
const TaskSchema = new Schema({
  title: { type: String, required: true },
  category: {
    type: Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: String,
});

module.exports = model("Task", TaskSchema);
