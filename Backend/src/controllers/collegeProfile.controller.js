import CollegeProfile from "../models/CollegeProfile.model.js";

/* ================= GET PROFILE ================= */
export const getCollegeProfile = async (req, res) => {
  try {
    const profile = await CollegeProfile.findOne({
      collegeId: req.user.collegeId,
    });

    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to load profile" });
  }
};

/* ================= SAVE PROFILE ================= */
export const saveCollegeProfile = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;

    const update = {};
    const allowedFields = [
      "collegeName",
      "authorizedPerson",
      "email",
      "mobile",
      "password",
      "collegeType",
      "state",
      "city",
      "address",
      "pincode",
      "isSubmitted",
    ];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        update[field] = req.body[field];
      }
    }

    const profile = await CollegeProfile.findOneAndUpdate(
      { collegeId },
      { $set: update },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to save profile" });
  }
};

/* ================= UPLOAD DOCUMENT ================= */
export const uploadProfileDocument = async (req, res) => {
  try {
    const collegeId = req.user.collegeId;
    const { type } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const fieldMap = {
      registration: "documents.registrationCertificate",
      approval: "documents.approvalCertificate",
      logo: "documents.logo",
    };

    if (!fieldMap[type]) {
      return res.status(400).json({ message: "Invalid document type" });
    }

    const update = {};
   update[fieldMap[type]] = {
  path: req.file.path.replace(/\\/g, "/"),
  originalName: req.file.originalname,
};

    // 🚨 IMPORTANT: NO UPSERT HERE
    const profile = await CollegeProfile.findOneAndUpdate(
      { collegeId },
      { $set: update },
      { new: true }
    );

    if (!profile) {
      return res.status(400).json({
        message: "Profile not created yet. Save profile first.",
      });
    }

    res.json({
      message: "Document uploaded successfully",
      documents: profile.documents,
    });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};
