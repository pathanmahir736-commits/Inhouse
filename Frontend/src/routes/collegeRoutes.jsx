import CollegeLayout from "../modules/college/layouts/CollegeLayout";
import Courses from "../modules/college/pages/Courses";
import Payments from "../modules/college/pages/Payments";
import Admissions from "../modules/college/pages/Admissions";

export const collegeRoutes = {
  path: "/college",
  element: <CollegeLayout />,
  children: [
    { path: "courses", element: <Courses /> },
    { path: "payments", element: <Payments /> },
    { path: "admissions", element: <Admissions /> },
  ],
};
