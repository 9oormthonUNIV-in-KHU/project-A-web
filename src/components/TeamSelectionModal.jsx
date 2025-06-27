import "../styles/Calendar.css"; // Calendar.css에 스타일 추가

const TEAMS = [
  { key: "all", label: "전체", color: "selected-gray" },
  { key: "plan", label: "기획", color: "selected-blue" },
  { key: "design", label: "디자인", color: "selected-green" },
  { key: "frontend", label: "프론트엔드", color: "selected-orange" },
  { key: "backend", label: "백엔드", color: "selected-purple" },
];

export default function TeamSelectModal({ open, selectedTeams, setSelectedTeams, onClose }) {
  if (!open) return null;

  const handleClick = (key) => {
    // '전체' 선택 처리
    if (key === "all") {
      // '전체'가 이미 선택된 경우: 선택 해제
      if (selectedTeams.includes("all")) {
        setSelectedTeams([]);
      } 
      // '전체'가 선택되지 않은 경우: '전체'만 선택
      else {
        setSelectedTeams(["all"]);
      }
    }
    // 다른 팀 선택 처리
    else {
      // 현재 선택된 팀 목록에서 'all' 제거
      const newSelected = selectedTeams.filter(k => k !== "all");
      
      // 이미 선택된 팀인지 확인
      const isSelected = newSelected.includes(key);
      
      // 선택 상태 토글
      if (isSelected) {
        setSelectedTeams(newSelected.filter(k => k !== key));
      } else {
        // 최대 3개까지 선택 가능
        if (newSelected.length < 3) {
          setSelectedTeams([...newSelected, key]);
        }
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="team-modal">
        <div className="team-modal-header">
          <b className="team-modal-title">팀 선택</b>
          <span className="team-modal-desc">최대 3개 선택 가능</span>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-team-btn-group">
          {TEAMS.map((team) => (
            <button
              key={team.key}
              className={`modal-team-btn ${selectedTeams.includes(team.key) ? team.color : ""}`}
              onClick={() => handleClick(team.key)}
              disabled={
                team.key !== "all" && // '전체' 버튼은 항상 활성화
                !selectedTeams.includes(team.key) && // 이미 선택된 항목은 비활성화 안함
                selectedTeams.filter(k => k !== "all").length >= 3 // 'all' 제외한 개수 체크
              }
            >
              {team.label}
            </button>
          ))}
        </div>
        <div className="team-modal-footer">
          <button className="edit-btn">편집/추가</button>
        </div>
      </div>
      <div className="modal-bg" onClick={onClose}></div>
    </div>
  );
}
