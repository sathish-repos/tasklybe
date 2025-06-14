import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
  {
    isCompleted: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: [true, "Subtask title is required"],
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
  },
  { _id: false }
);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 1000,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: (value) => value > new Date(),
        message: "Due date must be in the future",
      },
    },
    reminderAt: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value < this.dueDate;
        },
        message: "Reminder must be before the due date",
      },
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "blocked", "completed"],
      required: [true, "Task status is required"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "very-high"],
      default: "medium",
    },
    color: {
      type: String,
      trim: true,
      maxLength: 30,
    },
    notificationEnabled: {
      type: Boolean,
      default: false,
    },
    subTask: {
      type: [subTaskSchema],
      default: [],
    },
    tags: {
      type: [String],
      enum: [
        "personal",
        "work",
        "health",
        "study",
        "event",
        "follow-up",
        "meeting",
      ],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-update `updatedAt` and check status on save
taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();

  // Optional: Auto-complete task if all subtasks are done
  if (
    this.subTask?.length > 0 &&
    this.subTask.every((st) => st.isCompleted) &&
    this.status !== "completed"
  ) {
    this.status = "completed";
  }

  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
