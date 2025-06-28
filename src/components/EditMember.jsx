import React, { useState } from 'react';
import "../styles/CreateMember.css";

export default function EditMember({ member, onCancel, onSave, onDelete }) {
  const [formData, setFormData] = useState({ ...member });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, member_year: parseInt(formData.member_year) || 0 });
  };

  return (
    <main className="main-content">
      <header className="create-header">
        <h2>부원 정보 수정</h2>
        <button className="cancel-btn" onClick={onCancel}>취소</button>
      </header>
      <div className="create-container">
        <form onSubmit={handleSubmit} className="create-form">
          <div className="row name-gender-row">
            <div className="field">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요."
                required
              />
            </div>
            
          </div>

          <div className="row">
            <div className="field">
              <label>성별</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="성별을 입력하세요."
                required
              />
            </div>
            <div className="field">
              <label>생년월일</label>
              <input
                type="text"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                placeholder="예: 20010307"
                required
              />
            </div>
            
          </div>

          <div className="row">
            <div className="field">
              <label>학번</label>
              <input
                type="text"
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                placeholder="학번을 입력하세요."
                required
              />
            </div>
            <div className="field">
              <label>학교/학과</label>
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleChange}
                placeholder="학교/학과를 입력하세요."
                required
              />
            </div>
            
          </div>
          <div className="row">
            <div className="field">
              <label>연락처</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="연락처를 입력하세요."
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label>메일주소</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="메일주소를 입력하세요."
                required
              />
            </div>
          </div>
          
          <div className="row">
            
            <div className="field">
              <label>기수</label>
              <input
                type="number"
                name="member_year"
                value={formData.member_year}
                onChange={handleChange}
                placeholder="기수를 입력하세요."
                required
              />
            </div>
            <div className="field">
              <label>부서/직책</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="부서/직책을 입력하세요."
                required
              />
            </div>
          </div>

          <div className="row">
            
            <div className="field">
              <label>메모</label>
              <input
                type="text"
                name="memo"
                value={formData.memo}
                onChange={handleChange}
                placeholder="메모를 입력하세요."
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">저장</button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                if (window.confirm('삭제한 내용은 복원할 수 없습니다.\n정말 삭제하시겠습니까?')) {
                  onDelete(formData.id);
                }
              }}
            >
              삭제
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
