import { useState, useRef } from "react";
import "../styles/Calendar.css";
import TeamSelectionModal from "../components/TeamSelectionModal";
import MonthYearModal from "../components/MonthYearModal";
import DateSchedulePopover from "../components/DateSchedulePopover";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar() {
  
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  
  const cellRefs = useRef({}); // 날짜 셀 참조를 저장

  // 팀 목록
  const TEAMS = [
    { key: "all", label: "전체" },
    { key: "plan", label: "기획" },
    { key: "design", label: "디자인" },
    { key: "frontend", label: "프론트엔드" },
    { key: "backend", label: "백엔드" },
  ];

  // 휴일 데이터
  const holidays = {
    "2025-06-06": "현충일",
  };

  // 일정 데이터
  const [schedules] = useState({
    "2025-06-01": [
        { title: "동아리 정기모임", team: "all" }
    ],
    "2025-06-06": [
        { title: "현충일 행사", team: "all" },
        { title: "임원 회의", team: "plan" }
    ],
    "2025-06-15": [
        { title: "워크숍", team: "design" }
    ],
    "2025-06-19": [
        { title: "디자인 브랜딩 회의", team: "design" }
    ],
    "2025-06-26": [
        { title: "프로젝트 회의", team: "frontend" }
    ],
    "2025-06-29": [
        { title: "월말 보고서 제출", team: "backend" }
    ],
  });

  function filterSchedulesByTeams(scheduleArr) {
    if (!scheduleArr) return [];
    if (selectedTeams.includes("all")) return scheduleArr;
    return scheduleArr.filter(item => selectedTeams.includes(item.team));
  }

  // 날짜 클릭 핸들러 - 팝오버 위치 계산
  const handleDateClick = (dateStr, date, month, year, event) => {
    event.stopPropagation();
    
    const cell = cellRefs.current[dateStr];
    if (cell) {
      const rect = cell.getBoundingClientRect();
      const POPOVER_WIDTH = 280;
      const POPOVER_HEIGHT = 200;
      
      let left = rect.left + window.scrollX - POPOVER_WIDTH - 12;
      let top = rect.top + window.scrollY;
      
      // 화면 왼쪽 경계 확인 및 보정
      if (left < 10) {
        left = rect.right + window.scrollX + 12; // 오른쪽으로 이동
      }
      
      // 화면 아래쪽 경계 확인 및 보정
      if (top + POPOVER_HEIGHT > window.innerHeight + window.scrollY - 20) {
        top = rect.bottom + window.scrollY - POPOVER_HEIGHT;
      }
      
      setPopoverPos({ top, left });
    }
    
    setSelectedDate({
      dateStr,
      date,
      month,
      year,
      schedules: schedules[dateStr] || []
    });
    setDatePopoverOpen(true);
  };

  // 팝오버 외부 클릭 시 닫기
  const handleDocumentClick = (event) => {
    if (datePopoverOpen && !event.target.closest('.date-schedule-popover')) {
      setDatePopoverOpen(false);
    }
  };

  // 문서 클릭 이벤트 리스너
  useState(() => {
    if (datePopoverOpen) {
      document.addEventListener('click', handleDocumentClick);
      return () => document.removeEventListener('click', handleDocumentClick);
    }
  }, [datePopoverOpen]);

  // 오늘 날짜
  const todayObj = new Date();
  const todayStr = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(todayObj.getDate()).padStart(2, '0')}`;

  // 달력 기준 연/월
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const [modalOpen, setModalOpen] = useState(false);

  const handleToday = () => {
    setYear(todayObj.getFullYear());
    setMonth(todayObj.getMonth() + 1);
  };

  // 해당 월의 1일과 마지막 날짜 정보
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const startWeekDay = firstDay.getDay();
  const endDate = lastDay.getDate();
  const prevLastDay = new Date(year, month - 1, 0).getDate();

  // 달력 생성
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
      
      if (week === 0 && d < startWeekDay) {
        cellDate = prevLastDay - startWeekDay + d + 1;
        cellMonth = month - 1;
        cellYear = month === 1 ? year - 1 : year;
        isCurrentMonth = false;
      } else if (day <= endDate) {
        cellDate = day;
        cellMonth = month;
        cellYear = year;
        day++;
      } else {
        cellDate = nextMonthDay++;
        cellMonth = month + 1;
        cellYear = month === 12 ? year + 1 : year;
        isCurrentMonth = false;
      }

      const cellDateStr = `${cellYear}-${String(cellMonth).padStart(2, '0')}-${String(cellDate).padStart(2, '0')}`;
      const isToday = cellDateStr === todayStr;

      weekRow.push(
        <td
          key={d}
          ref={el => cellRefs.current[cellDateStr] = el}
          className={[
            holidays[cellDateStr] ? 'holiday' : '',
            isToday ? 'today' : '',
            !isCurrentMonth ? 'next-month' : '',
            'clickable-date'
          ].join(' ').trim()}
          onClick={(e) => handleDateClick(cellDateStr, cellDate, cellMonth, cellYear, e)}
        >
          <div className="date-content">
            <span className="date-number">{cellDate}</span>
            {holidays[cellDateStr] && <div className="holiday-label">{holidays[cellDateStr]}</div>}
            {filterSchedulesByTeams(schedules[cellDateStr]).length > 0 && (
                <ul className="schedule-list">
                    {filterSchedulesByTeams(schedules[cellDateStr]).map((item, idx) => (
                    <li key={idx} className={`schedule-item ${item.team}`}>
                        {item.title}
                    </li>
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
          <div className="calendar-left">
            <span
            className="calendar-title"
            style={{ cursor: "pointer" }}
            onClick={() => setModalOpen(true)}
            >
            {year}.{String(month).padStart(2, "0")}
              <span style={{ marginLeft: 6, fontSize: 18, verticalAlign: "middle" }}> ▼ </span>
            </span>
            <button className="today-btn" onClick={handleToday}>Today</button>
          </div>

          <div className="calendar-right">
            <div className="selected-teams">
                {selectedTeams.map(key => {
                const team = TEAMS.find(t => t.key === key);
                return (
                    <span key={key} className={`selected-team-badge ${key}`}>
                    {team ? team.label : key}
                    </span>
                );
                })}
            </div>
            <button className="team-btn" onClick={() => setTeamModalOpen(true)}>팀 선택</button>
          </div>
        </div>
        
        <div className="calendar-container">
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
          
          {/* 날짜별 일정 팝오버 */}
          <DateSchedulePopover
            open={datePopoverOpen}
            selectedDate={selectedDate}
            onClose={() => setDatePopoverOpen(false)}
            position={popoverPos}
            WEEKDAYS={WEEKDAYS}
          />
        </div>
        
        <MonthYearModal
          open={modalOpen}
          year={year}
          month={month}
          onChange={handleMonthYearChange}
          onClose={() => setModalOpen(false)}
          MONTHS={MONTHS}
        />
        
        <TeamSelectionModal
          open={teamModalOpen}
          selectedTeams={selectedTeams}
          setSelectedTeams={setSelectedTeams}
          onClose={() => setTeamModalOpen(false)}
        />
      </section>
    </main>
  );
}
