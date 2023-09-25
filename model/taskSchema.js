const { model, Schema } = require("mongoose");
const TaskSchema = new Schema({
  title: { type: String, required: true },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category ID is required"],
  },
  date: { type: Date, required: [true, "Date is required"] },
  time: { type: Date, required: [true, "Time is required"] },
  isCompleted: { type: Boolean, required: true, default: false },
  description: String,
  createdBy: { type: Schema.ObjectId, ref: "User", required: true },
});

module.exports = model("Task", TaskSchema);
