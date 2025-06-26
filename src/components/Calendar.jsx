import { useState } from "react";
import "../styles/Calendar.css"

export default function Calendar() {
    // 휴일 데이터
    const holidays = {
    "2025-06-06": "현충일",
    };

    // 일정 데이터
    const [schedules] = useState({
    "2025-06-01": ["동아리 정기모임"],
    "2025-06-06": ["현충일 행사", "임원 회의"],
    "2025-06-15": ["워크숍"],
    "2025-06-26": ["프로젝트 회의"],
    "2025-06-29": ["월말 보고서 제출"],
    });

    // 날짜별 일정 렌더링
    const renderSchedules = (dateStr) => {
    if (!schedules[dateStr]) return null;
    return (
        <ul className="schedule-list">
        {schedules[dateStr].map((item, idx) => (
            <li key={idx} className="schedule-item">{item}</li>
        ))}
        </ul>
    );
    };

    // 날짜 셀 렌더링
    const renderDateCell = (date, isCurrentMonth = true, isToday = false) => {
    const dateStr = `2025-06-${date.toString().padStart(2, '0')}`;
    const isHoliday = holidays[dateStr];
    
    return (
        <td className={`${isHoliday ? 'holiday' : ''} ${isToday ? 'today' : ''} ${!isCurrentMonth ? 'next-month' : ''}`}>
        <div className="date-content">
            <span className="date-number">{date}</span>
            {isHoliday && <div className="holiday-label">{holidays[dateStr]}</div>}
            {renderSchedules(dateStr)}
        </div>
        </td>
    );
    };

    return (
        <main className="main-content">
        <header className="main-header">
          <h2>월간기록</h2>
        </header>
        <section className="calendar-section">
          <div className="calendar-header">
            <button className="arrow">&lt;</button>
            <span className="calendar-title">2025.06</span>
            <button className="arrow">&gt;</button>
            <button className="today-btn">Today</button>
            <button className="team-btn">팀 선택</button>
          </div>
          <table className="calendar-table">
            <thead>
              <tr className="weekdays-header">
                <th className="sun">Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th className="sat">Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {renderDateCell(1)}
                {renderDateCell(2)}
                {renderDateCell(3)}
                {renderDateCell(4)}
                {renderDateCell(5)}
                {renderDateCell(6)}
                {renderDateCell(7)}
              </tr>
              <tr>
                {renderDateCell(8)}
                {renderDateCell(9)}
                {renderDateCell(10)}
                {renderDateCell(11)}
                {renderDateCell(12)}
                {renderDateCell(13)}
                {renderDateCell(14)}
              </tr>
              <tr>
                {renderDateCell(15)}
                {renderDateCell(16)}
                {renderDateCell(17)}
                {renderDateCell(18)}
                {renderDateCell(19)}
                {renderDateCell(20)}
                {renderDateCell(21)}
              </tr>
              <tr>
                {renderDateCell(22)}
                {renderDateCell(23)}
                {renderDateCell(24)}
                {renderDateCell(25)}
                {renderDateCell(26)}
                {renderDateCell(27)}
                {renderDateCell(28)}
              </tr>
              <tr>
                {renderDateCell(29, true, true)} {/* 오늘 날짜 */}
                {renderDateCell(30)}
                {renderDateCell(1, false)}
                {renderDateCell(2, false)}
                {renderDateCell(3, false)}
                {renderDateCell(4, false)}
                {renderDateCell(5, false)}
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    )
}