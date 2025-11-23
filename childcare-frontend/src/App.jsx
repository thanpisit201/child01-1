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
import MealMenu from "./pages/MealMenu"; // ใช้สำหรับ /meals
import Announcement from "./pages/Announcements";
import MyChildren from "./pages/MyChildren";
import Menus from "./pages/Menus"; // ใช้สำหรับแสดงเมนูอาหาร

import { useAuth } from "./context/AuthProvider";

// -----------------------------
// 🔐 ส่วนควบคุมสิทธิ์การเข้าใช้ (ใช้ user?.role และรวม admin ใน TeacherOnly)
// -----------------------------
function Private({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-5">Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function ParentOnly({ children }) {
  const { user } = useAuth();
  // ตรวจสอบว่าบทบาทเป็น 'parent' เท่านั้น
  return user?.role === "parent" ? children : <Navigate to="/" replace />;
}

function TeacherOnly({ children }) {
  const { user } = useAuth();
  // ✅ การแก้ไขสำคัญ: รวม 'teacher' และ 'admin' ให้เข้าถึงได้
  const isAuthorized = user?.role === "teacher" || user?.role === "admin";
  return isAuthorized ? children : <Navigate to="/" replace />;
}

function GuestOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-5">Loading...</div>;
  return user ? <Navigate to="/" replace /> : children;
}

// -----------------------------
// 🧭 ส่วนหลักของแอป
// -----------------------------
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* 🏠 หน้าแรก (Index) — สาธารณะ ไม่ต้องล็อกอิน */}
        <Route path="/" element={<Index />} />

        {/* 🏠 หน้าแดชบอร์ดจริง (ต้องล็อกอิน) */}
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />

        {/* 🔓 ผู้ที่ยังไม่ได้ล็อกอิน */}
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

        {/* 👨‍👩‍👧 สำหรับ "ผู้ปกครอง" */}
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

        {/* 👩‍🏫 สำหรับ "ครู/แอดมิน" - TeacherOnly ที่แก้ไขแล้วจะควบคุมเส้นทางเหล่านี้ */}
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
        <Route
          path="/meals"
          element={
            <Private>
              <TeacherOnly>
                <MealMenu />
              </TeacherOnly>
            </Private>
          }
        />

        {/* 📢 ประกาศ — สามารถเข้าถึงได้ทั้งครูและผู้ปกครอง */}
        <Route
          path="/announcements"
          element={
            <Private>
              <Announcement />
            </Private>
          }
        />
        
        {/* 🍳 เมนูอาหาร - หน้าแสดงผล (ใช้สำหรับผู้ปกครอง) */}
        <Route
          path="/menus"
          element={
            <Private>
              <Menus />
            </Private>
          }
        />

        {/* 🔄 ทางลัดเดิมให้ใช้งานได้ (ตรวจสอบว่ายังต้องการหรือไม่) */}
        <Route path="/health/measure" element={<Navigate to="/health" replace />} />

        {/* ❌ เส้นทางอื่น ส่งกลับหน้าแรก (ต้องอยู่ท้ายสุดเสมอ) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}