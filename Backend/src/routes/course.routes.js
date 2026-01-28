import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createCourse);
router.get("/", authMiddleware, getCourses);
router.patch("/:id", authMiddleware, updateCourse);
router.delete("/:id", authMiddleware, deleteCourse);

export default router;
