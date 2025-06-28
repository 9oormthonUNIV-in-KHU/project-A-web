import '../styles/RecordPage.css';
import { useState } from 'react';
import Calendar from '../components/Calendar';
export default function Schedule() {
  const [showCalendar, setShowCalendar] = useState(false);

  if (showCalendar) return <Calendar />;

  return (
    <div className="schedule-background">
      <div className="schedule-main">
        <div className="schedule-head">
          <div className="schedule-title">일정</div>
          <button
            className="save-button"
            onClick={() => {
              setShowCalendar(true);
            }}
          >
            저장
          </button>
        </div>

        <div className="schedule-content">
          <div>
            <div className="schedule-title-input">
              <input
                type="text"
                placeholder="제목을 입력하세요."
                value="디자인 브랜딩 회의"
                readOnly
              />
              <div className="schedule-team-select">
                <button className="team-design-button">디자인</button>
                <button className="team-change">팀 변경</button>
              </div>
            </div>

            <div className="date">
              <div>2025.06.01 토</div>
            </div>
          </div>

          <div className="schedule-memo">
            <div className="shedule-title">
              <h1 className="memo">메모</h1>
              <input
                placeholder="회의명을 작성해주세요"
                className="memo-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
