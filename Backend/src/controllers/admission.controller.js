import mongoose from "mongoose";
import Admission from "../models/Admission.model.js";
import Course from "../models/Course.model.js";
 import Payment from "../models/Payment.model.js";

export const applyAdmission = async (req, res) => {
  try {
    const { studentName, email, courseId,studentProfile } = req.body;

    if (!studentName || !email || !courseId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid courseId" });
    }

    // if (studentId && !mongoose.Types.ObjectId.isValid(studentId)) {
    //   return res.status(400).json({ message: "Invalid studentId" });
    // }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.availableSeats <= 0) {
      return res.status(400).json({ message: "Seats full" });
    }

    const admission = await Admission.create({
      collegeId: course.collegeId.toString(),
      studentName,
      email,
      courseId,
      studentProfile,
      // : studentId || null,
    });

    res.status(201).json(admission);
  } catch (err) {
    console.error("APPLY ADMISSION ERROR:", err);
    res.status(500).json({ message: "Failed to apply admission" });
  }
};


/* ================================
   COLLEGE GET ALL ADMISSIONS
================================ */
export const getAdmissions = async (req, res) => {
  try {
    if (!req.user?.collegeId) {
      return res.status(400).json({ message: "College ID missing in token" });
    }

    const admissions = await Admission.find({
      collegeId: req.user.collegeId,
    })
      .populate("courseId", "name")
      // .populate("studentprofile")
      .sort({ createdAt: -1 });

    res.json(admissions);
  } catch (err) {
    console.error("GET ADMISSIONS ERROR:", err);
    res.status(500).json({ message: "Failed to load admissions" });
  }
};


/* ================================
   APPROVE ADMISSION
================================ */
export const approveAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    if (admission.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    // Lock seat
    const course = await Course.findOneAndUpdate(
      {
        _id: admission.courseId,
        availableSeats: { $gt: 0 },
      },
      { $inc: { availableSeats: -1 } },
      { new: true }
    );

    if (!course) {
      return res.status(400).json({ message: "Seats full" });
    }

    // Approve
    admission.status = "approved";
    await admission.save();

    // Ensure single payment
    const exists = await Payment.findOne({
      admissionId: admission._id,
    });

    if (!exists) {
      await Payment.create({
        collegeId: admission.collegeId,
        admissionId: admission._id,

        studentName: admission.studentName,
        courseName: course.name,

        totalAmount: Number(course.fees),
        paidAmount: 0,

        status: "PENDING",
      });
    }

    res.json({ message: "Admission approved" });
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: "Approve failed" });
  }
};


/* ================================
   REJECT ADMISSION
================================ */
export const rejectAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    if (admission.status !== "pending") {
      return res.status(400).json({ message: "Already processed" });
    }

    admission.status = "rejected";
    await admission.save();

    res.json(admission);
  } catch (err) {
    res.status(500).json({ message: "Failed to reject admission" });
  }
};
