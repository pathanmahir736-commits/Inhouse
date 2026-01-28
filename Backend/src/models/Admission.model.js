import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    // ✅ ADD THIS
    studentProfile: {
      tenthMarks: Number,
      twelfthMarks: Number,
      schoolName: String,
      board: String,
      yearOfPassing: Number,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentType: {
  type: String,
  enum: ["FULL", "EMI"],
  default: "EMI",
},

    feeCollected: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Admission", admissionSchema);
