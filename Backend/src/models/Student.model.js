import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },

  marks10: Number,
  marks12: Number,
  school: String,
  board: String,
  yearOfPassing: Number,
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
