import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  IndianRupee,
  User,
  Edit,
} from "lucide-react";

export default function Sidebar({ onNavigate }) {
  const base =
    "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition";

  const active = "bg-blue-600 text-white";
  const inactive = "text-gray-600 hover:bg-gray-100";

  const link = ({ isActive }) =>
    `${base} ${isActive ? active : inactive}`;

  return (
    <nav className="flex-1 p-4 space-y-1">
      <NavLink to="/college/dashboard" className={link} onClick={onNavigate}> 
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>

      <NavLink to="/college/profile" className={link} onClick={onNavigate}>
        <Edit size={18} />
        Edit Profile
      </NavLink>

      <NavLink to="/college/courses" className={link} onClick={onNavigate}>
        <BookOpen size={18} />
        Courses
      </NavLink>

      <NavLink to="/college/admissions" className={link} onClick={onNavigate}>
        <GraduationCap size={18} />
        Admissions
      </NavLink>

      <NavLink to="/college/payments" className={link} onClick={onNavigate}>
        <IndianRupee size={18} />
        Payments
      </NavLink>
    </nav>
  );
}
