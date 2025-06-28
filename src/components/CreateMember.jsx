import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/CreateMember.css";

const API_URL = 'https://dongari-eum-backend.onrender.com/';

export default function CreateMember({ onCancel, onSave }) {
  const { id: clubId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birth_date: '',
    student_id: '',
    major: '',
    phone_number: '',
    email: '',
    member_year: '',
    role: '',
    memo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}clubs/${clubId}/members`,
        {
          name: formData.name,
          birth_date: formData.birth_date,
          student_id: formData.student_id,
          major: formData.major,
          phone_number: formData.phone_number,
          email: formData.email,
          gender: formData.gender,
          member_year: parseInt(formData.member_year) || 0,
          role: formData.role,
          memo: formData.memo
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 서버에서 생성된 멤버 데이터로 상태 업데이트
      onSave(response.data);
      alert('부원이 성공적으로 추가되었습니다!');
    } catch (error) {
      console.error('부원 추가 실패:', error);
      alert('부원 추가에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main-content">
      <header className="create-header">
        <h2>부원 추가</h2>
        <button 
          className="cancel-btn" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          취소
        </button>
      </header>
      <div className="create-container">
        <form className="create-form" onSubmit={handleSubmit}>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="button-group" style={{ justifyContent: "flex-end" }}>
            <button 
              type="submit" 
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
