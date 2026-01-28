import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { collegeOnly } from "../middlewares/collegeGuard.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

/**
 * FINAL PATH:
 * GET /api/college/dashboard
 */
router.get(
  "/dashboard",
  authMiddleware,
  collegeOnly,
  getDashboardStats
);

export default router;
