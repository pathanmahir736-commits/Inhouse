import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { collegeOnly } from "../middlewares/collegeGuard.js";
import { getDashboard } from "../controllers/collegeController.js";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

/* DASHBOARD */
router.get(
  "/dashboard",
  authMiddleware,
  collegeOnly,
  getDashboard
);

/* COURSES */
router.post(
  "/courses",
  authMiddleware,
  collegeOnly,
  createCourse
);

router.get(
  "/courses",
  authMiddleware,
  collegeOnly,
  getCourses
);

router.put(
  "/courses/:id",
  authMiddleware,
  collegeOnly,
  updateCourse
);

router.delete(
  "/courses/:id",
  authMiddleware,
  collegeOnly,
  deleteCourse
);

export default router;
