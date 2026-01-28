import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { useCollege } from "../../../Context/CollegeContext"; // ✅ correct casing

export default function CollegeLayout() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { college, loading } = useCollege(); // ✅ single call

  if (loading) return null;

  const logoPath = college?.documents?.logo?.path;
  const logoUrl = logoPath
    ? `http://localhost:5000/${logoPath}`
    : null;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/college/login";
  };

  return (
    <div className="h-screen bg-white overflow-hidden">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 bg-white border-r border-gray-200 z-40">
        <div className="flex flex-col h-full w-full">
          {/* BRAND */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="College Logo"
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
                  I
                </div>
              )}
              <span className="text-xl font-bold text-blue-600">
                {college?.collegeName || "InHousee"}
              </span>
            </div>
          </div>

          <Sidebar />
        </div>
      </aside>

      {/* ================= MOBILE SIDEBAR ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <aside className="w-64 bg-white shadow-xl flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="College Logo"
                    className="h-8 w-8 object-contain"
                  />
                ) : (
                  <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold">
                    I
                  </div>
                )}
                <span className="text-lg font-bold text-blue-600">
                  {college?.collegeName || "InHousee"}
                </span>
              </div>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>

          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* ================= MAIN AREA ================= */}
      <div className="md:ml-64 h-full flex flex-col">
        {/* ================= TOPBAR ================= */}
        <header className="h-16 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>

            <div className="flex flex-col leading-tight">
              <h2 className="text-sm font-semibold text-gray-800">
                College Admin
              </h2>
              <span className="text-xs text-gray-500">
                InHousee Platform
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(o => !o)}
              className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 hover:bg-gray-100 transition"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-100 bg-white flex items-center justify-center">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="College Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="bg-blue-600 text-white w-full h-full flex items-center justify-center font-semibold">
                    CP
                  </span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border">
                <NavLink
                  to="/college/profile/view"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setProfileOpen(false)}
                >
                  <User size={16} />
                  Profile
                </NavLink>

                <div className="h-px bg-gray-100" />

                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
