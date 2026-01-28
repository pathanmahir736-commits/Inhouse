import express from "express";
import { approveCollege } from "../controllers/adminController.js";

const router = express.Router();

router.patch("/approve-college/:id", approveCollege);

export default router;
