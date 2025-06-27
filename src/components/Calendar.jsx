import { useState } from "react";
import "../styles/Calendar.css"

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function MonthYearModal({ open, year, month, onChange, onClose }) {
  const [tempYear, setTempYear] = useState(year);

  if (!open) return null;

  const handleMonthClick = (idx) => {
    onChange(tempYear, idx + 1);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="month-year-modal">
        <div className="modal-header">
          <button className="modal-arrow" onClick={() => setTempYear(tempYear - 1)}>&lt;</button>
          <span className="modal-year">{tempYear}</span>
          <button className="modal-arrow" onClick={() => setTempYear(tempYear + 1)}>&gt;</button>
        </div>
        <div className="modal-months">
          {MONTHS.map((m, i) => (
            <button
              key={m}
              className={`modal-month${month === i + 1 && tempYear === year ? " selected" : ""}`}
              onClick={() => handleMonthClick(i)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="modal-bg" onClick={onClose}></div>
    </div>
  );
}

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

  // 오늘 날짜
  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;

  // 달력 기준 연/월 (2025년 6월로 고정, 추후 상태로 만들어도 됨)
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6); // 6월
  const [modalOpen, setModalOpen] = useState(false);

  // today 버튼 클릭 핸들러
  const handleToday = () => {
    setYear(todayObj.getFullYear());
    setMonth(todayObj.getMonth() + 1); // JS에서 월은 0부터 시작하니 +1
  };

  // 해당 월의 1일과 마지막 날짜 정보
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  // 시작 요일(0:일~6:토)
  const startWeekDay = firstDay.getDay();
  // 말일 날짜
  const endDate = lastDay.getDate();

  // 이전 달 마지막 날짜
  const prevLastDay = new Date(year, month - 1, 0).getDate();

  // 달력 6주(최대 42칸)로 구성
  const calendarCells = [];
  let day = 1;
  let nextMonthDay = 1;

  const handleMonthYearChange = (y, m) => {
    setYear(y);
    setMonth(m);
  };

  for (let week = 0; week < 6; week++) {
    let weekRow = [];
    for (let d = 0; d < 7; d++) {
      let cellDate, cellMonth, cellYear, isCurrentMonth = true;
      // 첫 주: 이전 달 날짜
      if (week === 0 && d < startWeekDay) {
        cellDate = prevLastDay - startWeekDay + d + 1;
        cellMonth = month - 1;
        cellYear = month === 1 ? year - 1 : year;
        isCurrentMonth = false;
      }
      // 이번 달 날짜
      else if (day <= endDate) {
        cellDate = day;
        cellMonth = month;
        cellYear = year;
        day++;
      }
      // 다음 달 날짜
      else {
        cellDate = nextMonthDay++;
        cellMonth = month + 1;
        cellYear = month === 12 ? year + 1 : year;
        isCurrentMonth = false;
      }

      // 날짜 문자열 (YYYY-MM-DD)
      const cellDateStr = `${cellYear}-${String(cellMonth).padStart(2, '0')}-${String(cellDate).padStart(2, '0')}`;
      // 오늘인지 판별
      const isToday = cellDateStr === todayStr;

      weekRow.push(
        <td
          key={d}
          className={[
            holidays[cellDateStr] ? 'holiday' : '',
            isToday ? 'today' : '',
            !isCurrentMonth ? 'next-month' : ''
          ].join(' ').trim()}
        >
          <div className="date-content">
            <span className="date-number">{cellDate}</span>
            {holidays[cellDateStr] && <div className="holiday-label">{holidays[cellDateStr]}</div>}
            {schedules[cellDateStr] && (
              <ul className="schedule-list">
                {schedules[cellDateStr].map((item, idx) => (
                  <li key={idx} className="schedule-item">{item}</li>
                ))}
              </ul>
            )}
          </div>
        </td>
      );
    }
    calendarCells.push(<tr key={week}>{weekRow}</tr>);
  }

  return (
    <main className="main-content">
      <header className="main-header">
        <h2>월간기록</h2>
      </header>
      <section className="calendar-section">
        <div className="calendar-header">
          <span
            className="calendar-title"
            style={{ cursor: "pointer" }}
            onClick={() => setModalOpen(true)}
          >
            {year}.{String(month).padStart(2, "0")}
            <span style={{ marginLeft: 6, fontSize: 18, verticalAlign: "middle" }}>▼</span>
          </span>
          <button className="today-btn" onClick={handleToday}>Today</button>
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
            {calendarCells}
          </tbody>
        </table>
        <MonthYearModal
          open={modalOpen}
          year={year}
          month={month}
          onChange={handleMonthYearChange}
          onClose={() => setModalOpen(false)}
        />
      </section>
    </main>
  );
}
