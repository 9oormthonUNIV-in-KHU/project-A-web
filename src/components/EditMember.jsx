import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/CreateMember.css";

const API_URL = 'https://dongari-eum-backend.onrender.com/';

export default function EditMember({ member, onCancel, onSave, onDelete }) {
  const { id: clubId } = useParams();
  const [formData, setFormData] = useState({ 
    ...member,
    member_year: member.member_year.toString() // 숫자를 문자열로 변환
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 수정 저장 처리 (PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      // PATCH 요청
      await axios.patch(
        `${API_URL}clubs/${clubId}/members/${member.id}`,
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
      
      // 상위 컴포넌트에 업데이트된 멤버 데이터 전달
      onSave({ 
        ...formData,
        member_year: parseInt(formData.member_year) || 0
      });
      alert('성공적으로 수정되었습니다!');
    } catch (error) {
      console.error('수정 실패:', error);
      alert('수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 멤버 삭제 처리 (DELETE)
  const handleDelete = async () => {
    if (!window.confirm('삭제한 내용은 복원할 수 없습니다.\n정말 삭제하시겠습니까?')) return;
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      // DELETE 요청
      await axios.delete(
        `${API_URL}clubs/${clubId}/members/${member.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // 상위 컴포넌트에 삭제 요청 전달
      onDelete(member.id);
      alert('성공적으로 삭제되었습니다!');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main-content">
      <header className="create-header">
        <h2>부원 정보 수정</h2>
        <button 
          className="cancel-btn" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          취소
        </button>
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

          <div className="button-group">
            <button 
              type="submit" 
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장'}
            </button>
            <button
              type="button"
              className="delete-btn"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? '삭제 중...' : '삭제'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
