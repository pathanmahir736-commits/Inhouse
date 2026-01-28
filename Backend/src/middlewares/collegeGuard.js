export const collegeOnly = (req, res, next) => {
  if (req.user.role !== "COLLEGE") {
    return res.status(403).json({ message: "Access denied" });
  }

  if (req.user.status === "SUSPENDED") {
    return res.status(403).json({ message: "College account suspended" });
  }

  next();
};
