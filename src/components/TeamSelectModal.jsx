import '../styles/TeamSelectModal.css';

export default function TeamSelectModal({
  onClose,
  selectedTeam,
  setSelectedTeam,
}) {
  const teams = ['전체', '기획', '디자인', '프론트엔드', '백엔드'];

  return (
    <div className="team-modal" onClick={(e) => e.stopPropagation()}>
      <div className="team-modal-header">
        <div className="team-select-title">
          <h1>팀 선택</h1>
        </div>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div className="team-options">
        {teams.map((team) => (
          <button
            key={team}
            className={`team-option team-${team} ${
              selectedTeam === team ? 'selected' : ''
            }`}
            onClick={() => {
              setSelectedTeam(team);
              onClose();
            }}
          >
            {team}
          </button>
        ))}
      </div>
      <div className="team-edit">편집/추가</div>
    </div>
  );
}
