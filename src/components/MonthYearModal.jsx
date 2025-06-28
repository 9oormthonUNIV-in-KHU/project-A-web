import { useState } from "react";

export default function MonthYearModal({ open, year, month, onChange, onClose, MONTHS }) {
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