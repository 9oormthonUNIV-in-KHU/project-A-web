import "../styles/DateSchedulePopover.css";

export default function DateSchedulePopover({ open, selectedDate, onClose, position, WEEKDAYS }) {
  if (!open || !selectedDate) return null;

  const { date, month, year, schedules } = selectedDate;
  
  // 요일 계산
  const dateObj = new Date(year, month - 1, date);
  const weekday = WEEKDAYS[dateObj.getDay()];

  const handleAddRecord = () => {
    console.log("기록 추가하기 클릭됨");
    onClose();
  };

  return (
    <div
      className="date-schedule-popover"
      style={{
        position: 'absolute',
        top: position.top-160,
        left: position.left-340,
        zIndex: 1000
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="popover-header">
        <h3 className="popover-title">
          {String(month).padStart(2, '0')}.{String(date).padStart(2, '0')} {weekday}
        </h3>
        <button className="popover-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
      
      <div className="popover-content">
        {schedules.length > 0 ? (
          <div className="schedules-list">
            {schedules.map((schedule, index) => (
              <div key={index} className="schedule-item-card">
                <div className={`schedule-indicator ${schedule.team}`}></div>
                <div className="schedule-details">
                  <h4 className="schedule-title">{schedule.title}</h4>
                  <div className="schedule-meta">
                    <span className="schedule-date">
                      {year}.{String(month).padStart(2, '0')}.{String(date).padStart(2, '0')} {weekday}
                    </span>
                    <span className="schedule-divider">|</span>
                    <span className="schedule-team">{getTeamLabel(schedule.team)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-schedules">
            <p className="no-schedules-text">
              아직 동아리 기록이 없어요!<br />기록을 남겨볼까요?
            </p>
            <button className="add-record-btn" onClick={handleAddRecord}>
              기록 추가하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 팀 키를 라벨로 변환하는 헬퍼 함수
function getTeamLabel(teamKey) {
  const teamLabels = {
    "all": "전체",
    "plan": "기획",
    "design": "디자인",
    "frontend": "프론트엔드",
    "backend": "백엔드"
  };
  return teamLabels[teamKey] || teamKey;
}
