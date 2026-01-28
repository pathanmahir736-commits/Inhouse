import { Navigate } from "react-router-dom";
import { mockCollegeAuth } from "./auth/mockCollegeAuth";

export default function CollegeRouteGuard({ children }) {
  if (!mockCollegeAuth.isLoggedIn) {
    return <Navigate to="/login/college" />;
  }

  if (!mockCollegeAuth.isApproved) {
    return <Navigate to="/college/not-approved" />;
  }

  return children;
}
