import '../styles/Schedule.css';
import { useState } from 'react';
import TeamSelectModal from '../components/TeamSelectModal';
import Schedule from './Schedule';

const RECORD = [
  { name: '회의록', link: 'record-page/meeting-note' },
  { name: '기획안', link: 'record-page/proposal' },
  { name: '결과보고서', link: 'record-page/report' },
  { name: '일정', link: 'record-page/schedule' },
  { name: '파일 업로드', link: 'record-page/file-upload' },
  { name: ' 자유 양식', link: 'record-page/custom-form' },
];

export default function RecordPage() {
  const [select, setSelect] = useState(null);
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  if (showSchedule) return <Schedule title={title} />;

  return (
    <div className="record-background">
      <div className="record-main">
        <div className="record-head">
          <div className="record-title">기록하기</div>
          <button
            className={`next-button ${select ? 'able' : ''}`}
            onClick={() => {
              if (select === '일정') {
                setShowSchedule(true);
              }
            }}
          >
            다음 →
          </button>
        </div>
        <div className="record-content">
          <div>
            <div className="record-title-input">
              <input
                type="text"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={title ? 'filled-input' : ''}
              />

              <div className="team-select-wrapper">
                {!selectedTeam ? (
                  <button
                    className="team-button"
                    onClick={() => setShowModal(true)}
                  >
                    팀 선택
                  </button>
                ) : (
                  <div className="change-btn">
                    <button
                      className={`team-chip-button chip-${selectedTeam}`}
                      onClick={() => setShowModal(true)}
                    >
                      <span className="team-chip-label">{selectedTeam}</span>
                    </button>
                    <button className="change-team">팀 변경</button>
                  </div>
                )}

                {showModal && (
                  <TeamSelectModal
                    onClose={() => setShowModal(false)}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                  />
                )}
              </div>
            </div>

            <div className="date">
              <div>2025.06.01 토</div>
            </div>
          </div>

          <div className="record-select">
            <div className="select-title">
              <h1>어떤 기록인가요?</h1>
              <p>종류를 선택하면 딱 맞는 기록 양식을 드려요!</p>
            </div>
            <div className="select-content">
              {RECORD.map((item) => {
                const isActive = select === item.name;
                const isInactive = select !== null && select !== item.name;

                return (
                  <div
                    key={item.name}
                    className={`select-button ${isActive ? 'active' : ''} ${
                      isInactive ? 'inactive' : ''
                    }`}
                    onClick={() => setSelect(item.name)}
                  >
                    <div key={item.link}>{item.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
