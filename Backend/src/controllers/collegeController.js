export const getDashboard = (req, res) => {
  res.json({
    message: "College dashboard loaded",
    college: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      status: req.user.status,
    },
  });
};
// export const getCollegeProfile = async (req, res) => {
//   try {
//     res.json({
//       collegeId: req.user.collegeId,
//       collegeName: req.user.collegeName,
//       authorizedPerson: req.user.authorizedPerson,
//       email: req.user.email,
//       status: "Approved", // static for now
//       createdAt: req.user.createdAt,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to load profile" });
//   }
// };
