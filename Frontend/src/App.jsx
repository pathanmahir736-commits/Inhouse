import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Courses from "./modules/college/pages/Courses";
import Dashboard from "./modules/college/pages/Dashboard";
import CollegeLogin from "./modules/college/pages/Login";
import Visits from "./modules/college/pages/Visits";
import Payments from "./modules/college/pages/Payments";
import CollegeLayout from "./modules/college/layout/collegeLayout";
import Admissions from "./modules/college/pages/Admissions";
import Profile from "./modules/college/pages/Profile";
import { CollegeProvider } from "./Context/CollegeContext";
import CollegeProfileView from "./modules/college/pages/CollegeProfileView";


export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to="/college/dashboard" replace />
              : <Navigate to="/college/login" replace />
          }
        />

        {/* Login */}
        <Route path="/college/login" element={<CollegeLogin />} />

        {/* 🔒 PROTECTED COLLEGE ROUTES */}
        <Route
          path="/college"
          element={
            <CollegeProvider>
              <CollegeLayout />
            </CollegeProvider>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="visits" element={<Visits />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/college/profile/view" element={<CollegeProfileView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
