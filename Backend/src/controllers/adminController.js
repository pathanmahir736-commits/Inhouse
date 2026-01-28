import College from "../models/College.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const approveCollege = async (req, res) => {
  try {
    

if (!mongoose.Types.ObjectId.isValid(courseId)) {
  return res.status(400).json({ message: "Invalid courseId" });
}

    const college = await College.findById(req.params.id);

    if (!college)
      return res.status(404).json({ message: "College not found" });

    if (college.status === "APPROVED")
      return res.status(400).json({ message: "Already approved" });

    const rawPassword = crypto.randomBytes(4).toString("hex");
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    college.status = "APPROVED";
    college.password = hashedPassword;

    await college.save();

    res.json({
      message: "College approved",
      login: {
        email: college.email,
        password: rawPassword, // shown once
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
