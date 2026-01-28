import Course from "../models/Course.model.js";
import Admission from "../models/Admission.model.js";
import mongoose from "mongoose";


export const createCourse = async (req, res) => {
  try {
    const { name, fees, semesters, totalSeats } = req.body;

    if (!name || !fees || !semesters || !totalSeats) {
      return res.status(400).json({
        message: "name, fees, semesters, totalSeats required",
      });
    }

    const course = await Course.create({
      collegeId: req.user.collegeId,
      name: name.trim(),
      fees: Number(fees),
      semesters: Number(semesters),
      totalSeats: Number(totalSeats),
      availableSeats: Number(totalSeats),
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("CREATE COURSE ERROR:", err);
    res.status(500).json({ message: "Create failed" });
  }
};



// GET
export const getCourses = async (req, res) => {
  const courses = await Course.find({
    collegeId: req.user.collegeId,
  });

  res.json(courses);
};

// UPDATE
export const updateCourse = async (req, res) => {
  try {
    const { name, fees, semesters, totalSeats } = req.body;
    const courseId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (!name || !fees || !semesters || !totalSeats) {
      return res.status(400).json({ message: "All fields required" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const filled = course.totalSeats - course.availableSeats;
    const newTotal = Number(totalSeats);

    if (newTotal < filled) {
      return res.status(400).json({
        message: "Seats already filled",
      });
    }

    const diff = newTotal - course.totalSeats;

    course.name = name.trim();
    course.fees = Number(fees);
    course.semesters = Number(semesters);
    course.totalSeats = newTotal;
    course.availableSeats += diff;

    await course.save();

    res.json(course);
  } catch (err) {
    console.error("UPDATE COURSE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};



// DELETE COURSE
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const admissionsCount = await Admission.countDocuments({
      courseId,
    });

    if (admissionsCount > 0) {
      return res.status(400).json({
        message: "Cannot delete course with active admissions",
      });
    }

    await Course.findByIdAndDelete(courseId);

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("DELETE COURSE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

