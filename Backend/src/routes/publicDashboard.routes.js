import express from "express";
import { getCollegeDashboard } from "../controllers/dashboard.controller.js";

const router = express.Router();

// 🚫 NO auth middleware
router.get("/college/dashboard", getCollegeDashboard);

export default router;
