import express from "express";
import { collegeLogin } from "../controllers/collegeAuth.controller.js";

const router = express.Router();

router.post("/college/login", collegeLogin);

export default router;
