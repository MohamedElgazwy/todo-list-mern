const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Task text is required"],
      trim: true, // لإزالة المسافات البيضاء الزائدة
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // يضيف createdAt و updatedAt
  }
);

module.exports = mongoose.model("Task", TaskSchema);
