import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/Members.css";
import CreateMember from './CreateMember';
import EditMember from './EditMember';

const API_URL = 'https://dongari-eum-backend.onrender.com/';

export default function Members() {
  const { id: clubId } = useParams();
  const [showCreate, setShowCreate] = useState(false);
  const [editMember, setEditMember] = useState(null);
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 서버에서 멤버 데이터 불러오기
  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}clubs/${clubId}/members`);
        setMembersData(res.data);
      } catch (e) {
        alert(`${e} 부원 정보를 불러오지 못했습니다.`);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, [clubId]);

  // 멤버 추가
  const handleAddMember = (newMember) => {
    setMembersData(prev => [...prev, newMember]);
    setShowCreate(false);
  };

  // 멤버 수정
  const handleUpdateMember = (updatedMember) => {
    setMembersData(prev =>
      prev.map(m => m.id === updatedMember.id ? updatedMember : m)
    );
    setEditMember(null);
  };

  // 멤버 삭제
  const handleDeleteMember = (id) => {
    setMembersData(prev => prev.filter(m => m.id !== id));
    setEditMember(null);
  };

  // 조건부 렌더링
  if (loading) return <div>로딩 중...</div>;

  if (showCreate) {
    return (
      <CreateMember 
        onCancel={() => setShowCreate(false)}
        onSave={handleAddMember}
      />
    );
  }

  if (editMember) {
    return (
      <EditMember
        member={editMember}
        onCancel={() => setEditMember(null)}
        onSave={handleUpdateMember}
        onDelete={handleDeleteMember}
      />
    );
  }

  return (
    <main className="main-content">
      <header className="main-header">
        <h2>부원관리</h2>
      </header>
      <div className="members-container">
        <div className="members-header">
          <button
            className="add-member-btn"
            onClick={() => setShowCreate(true)}
          >
            부원 추가
          </button>
        </div>
        <table className="members-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>성별</th>
              <th>생년월일</th>
              <th>학번</th>
              <th>학교/학과</th>
              <th>연락처</th>
              <th>메일</th>
              <th>기수</th>
              <th>부서/직책</th>
              <th>비고</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {membersData.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.gender}</td>
                <td>{member.birth_date}</td>
                <td>{member.student_id}</td>
                <td>{member.major}</td>
                <td>{member.phone_number}</td>
                <td className="ellipsis">{member.email}</td>
                <td>{`${member.member_year}기`}</td>
                <td>{member.role}</td>
                <td>{member.memo}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEditMember(member)}
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
