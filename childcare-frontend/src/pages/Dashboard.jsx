// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  const role = user?.role || "parent";

  // label ของ role
  const roleLabelMap = {
    admin: "ผู้ดูแลระบบ",
    teacher: "ครู/ผู้ดูแล",
    parent: "ผู้ปกครอง",
  };

  const roleLabel = roleLabelMap[role] || "ผู้ปกครอง";

  const isStaff = role === "admin" || role === "teacher";

  return (
    <div className="container py-4">
      <div className="section-hero d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">สวัสดี {user?.name || ""} 👋</h4>
          <div className="text-muted">บทบาท: {roleLabel}</div>
        </div>
        <div className="chip">
          <i className="bi bi-magic"></i>
        </div>
      </div>

      <div className="row g-3">
        {isStaff ? (
          <>
            <Card
              to="/children"
              icon="bi-people-fill"
              title="จัดการเด็ก"
              desc="เพิ่ม/แก้ไข/ลบ ข้อมูลเด็ก"
            />

            <Card
              to="/attendance"
              icon="bi-check2-square"
              title="การมาเรียน"
              desc="เช็คชื่อเด็กนักเรียน"
            />

            <Card
              to="/health"
              icon="bi-activity"
              title="สุขภาพ"
              desc="บันทึกส่วนสูง น้ำหนัก ฯลฯ"
            />

            <Card
              to="/announcements"
              icon="bi-megaphone-fill"
              title="ประกาศ"
              desc="ข่าวสารจากศูนย์"
            />

            {/* ⭐ เมนูอาหารเฉพาะครู + แอดมิน */}
            <Card
              to="/menus"
              icon="bi-egg-fried"
              title="เมนูอาหาร"
              desc="เมนูประจำวัน"
            />
          </>
        ) : (
          <>
            {/* ผู้ปกครองเห็นแค่ 2 เมนู */}

            <Card
              to="/my-children"
              icon="bi-heart-fill"
              title="ข้อมูลบุตรหลาน"
              desc="ดูข้อมูลบุตรหลานของฉัน"
            />

            <Card
              to="/announcements"
              icon="bi-megaphone-fill"
              title="ประกาศ"
              desc="ข่าวสาร/กิจกรรม"
            />
          </>
        )}
      </div>
    </div>
  );
}

function Card({ to, title, desc, icon }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Link to={to} className="text-decoration-none">
        <div className="card card-hover h-100 shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-center mb-2">
              <i
                className={`bi ${icon} me-2`}
                style={{ fontSize: "1.3rem", color: "var(--cc-accent)" }}
              ></i>
              <h5 className="card-title mb-0">{title}</h5>
            </div>
            <p className="card-text text-muted">{desc}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
