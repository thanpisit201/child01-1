import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Enroll from "./pages/Enroll";
import Children from "./pages/Children";
import Register from "./pages/Register";
import EnrollRequests from "./pages/EnrollRequests";

import Index from "./pages/Index";
import Health from "./pages/Health";
import Attendance from "./pages/Attendance";
import MealMenu from "./pages/MealMenu";
import Announcement from "./pages/Announcements";
import MyChildren from "./pages/MyChildren";
import Menus from "./pages/Menus";

import { useAuth } from "./context/AuthProvider";

// -----------------------------
// 🔐 ส่วนตรวจสิทธิ์
// -----------------------------
function Private({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-5">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function ParentOnly({ children }) {
  const { user } = useAuth();
  return user?.role === "parent" ? children : <Navigate to="/" replace />;
}

function TeacherOnly({ children }) {
  const { user } = useAuth();
  const allow = user?.role === "teacher" || user?.role === "admin";
  return allow ? children : <Navigate to="/" replace />;
}

function GuestOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-5">Loading...</div>;
  return user ? <Navigate to="/" replace /> : children;
}

// -----------------------------
// 🧭 Routing หลัก
// -----------------------------
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />

        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />

        <Route
          path="/login"
          element={
            <GuestOnly>
              <Login />
            </GuestOnly>
          }
        />

        <Route
          path="/register"
          element={
            <GuestOnly>
              <Register />
            </GuestOnly>
          }
        />

        {/* ผู้ปกครอง */}
        <Route
          path="/my-children"
          element={
            <Private>
              <ParentOnly>
                <MyChildren />
              </ParentOnly>
            </Private>
          }
        />

        <Route
          path="/enroll"
          element={
            <Private>
              <ParentOnly>
                <Enroll />
              </ParentOnly>
            </Private>
          }
        />

        {/* ครู + แอดมิน */}
        <Route
          path="/children"
          element={
            <Private>
              <TeacherOnly>
                <Children />
              </TeacherOnly>
            </Private>
          }
        />

        <Route
          path="/enroll-requests"
          element={
            <Private>
              <TeacherOnly>
                <EnrollRequests />
              </TeacherOnly>
            </Private>
          }
        />

        <Route
          path="/health"
          element={
            <Private>
              <TeacherOnly>
                <Health />
              </TeacherOnly>
            </Private>
          }
        />

        <Route
          path="/attendance"
          element={
            <Private>
              <TeacherOnly>
                <Attendance />
              </TeacherOnly>
            </Private>
          }
        />

        {/* ⭐ เมนูอาหารเฉพาะครู + แอดมิน */}
        <Route
          path="/menus"
          element={
            <Private>
              <TeacherOnly>
                <Menus />
              </TeacherOnly>
            </Private>
          }
        />

        {/* เข้าถึงได้ทุก role */}
        <Route
          path="/announcements"
          element={
            <Private>
              <Announcement />
            </Private>
          }
        />

        {/* redirect */}
        <Route
          path="/health/measure"
          element={<Navigate to="/health" replace />}
        />

        {/* Not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
