import "./src/config/env.js"; // 👈 MUST BE FIRST
import express from "express";
import cors from "cors";
dotenv.config();
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import dashboardRoutes from "./src/routes/dashboard.routes.js";
import courseRoutes from "./src/routes/course.routes.js";
import admissionRoutes from "./src/routes/admission.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import collegeProfileRoutes from "./src/routes/collegeProfile.routes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/* AUTH */
app.use("/api/auth", authRoutes);

/* COLLEGE */
app.use("/api/college", dashboardRoutes);
app.use("/api/college", collegeProfileRoutes);

/* DATA */
app.use("/api/courses", courseRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("🔥 SERVER RUNNING ON PORT 5000");
});
