import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    fees: {
      type: Number,
      required: true,
      min: 0,
    },

    semesters: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true, strict: true }
);

export default mongoose.model("Course", courseSchema);
