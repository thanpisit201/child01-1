// src/pages/Menus.jsx
import { useEffect, useState } from "react";

export default function Menus() {
  const [weeklyMenu, setWeeklyMenu] = useState([]);

  // Mock data (ภายหลังเปลี่ยนเป็น API)
  useEffect(() => {
    const mock = [
      {
        day: "จันทร์",
        breakfast: "ข้าวต้มหมู",
        lunch: "แกงจืดเต้าหู้หมูสับ",
        snack: "นม + กล้วย",
      },
      {
        day: "อังคาร",
        breakfast: "นม + ขนมปัง",
        lunch: "ผัดผักรวมหมู",
        snack: "ขนมปังกรอบ",
      },
      {
        day: "พุธ",
        breakfast: "ข้าวผัดไข่",
        lunch: "แกงเขียวหวานไก่",
        snack: "นมถั่วเหลือง",
      },
      {
        day: "พฤหัสบดี",
        breakfast: "ข้าวต้มไก่",
        lunch: "ผัดกะเพราไก่",
        snack: "ข้าวเกรียบ",
      },
      {
        day: "ศุกร์",
        breakfast: "โจ๊กหมู",
        lunch: "ผัดซีอิ๊วหมู",
        snack: "นม + ขนมปัง",
      },
    ];

    setWeeklyMenu(mock);
  }, []);

  return (
    <div>
      <h3 className="mb-3">เมนูอาหารประจำสัปดาห์</h3>

      <div className="card shadow-sm p-3">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>วัน</th>
              <th>อาหารเช้า</th>
              <th>อาหารกลางวัน</th>
              <th>ของว่าง</th>
            </tr>
          </thead>
          <tbody>
            {weeklyMenu.map((menu, index) => (
              <tr key={index}>
                <td className="fw-bold">{menu.day}</td>
                <td>{menu.breakfast}</td>
                <td>{menu.lunch}</td>
                <td>{menu.snack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-muted mt-3">
        *เมนูนี้เป็นข้อมูลตัวอย่าง — สามารถเชื่อมต่อ API ภายหลังได้
      </p>
    </div>
  );
}
