// src/services/studentMock.service.js

import mongoose from "mongoose";

// 🔥 TEMP MOCK DATA
const mockStudents = [
  {
    _id: new mongoose.Types.ObjectId("66a111111111111111111111"),
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    tenthPercent: 78,
    twelfthPercent: 82,
    stream: "Science",
    documents: {
      marksheet10: true,
      marksheet12: true,
      photo: true,
    },
  },
  {
    _id: new mongoose.Types.ObjectId("66a222222222222222222222"),
    name: "Anjali Verma",
    email: "anjali@gmail.com",
    tenthPercent: 88,
    twelfthPercent: 91,
    stream: "Commerce",
    documents: {
      marksheet10: true,
      marksheet12: true,
      photo: true,
    },
  },
];

// 🔥 MOCK FETCH FUNCTION
export const getMockStudentById = (studentId) => {
  return mockStudents.find(
    s => s._id.toString() === studentId.toString()
  );
};
