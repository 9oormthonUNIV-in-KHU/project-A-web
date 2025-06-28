import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ClubMain.css";
import logo from "../assets/violetdong.svg";
import month from "../assets/month.svg";
import year from "../assets/year.svg";
import member from "../assets/member.svg";
import account from "../assets/account.svg";
import Calendar from "../components/Calendar";
import Year from "../components/Year";
import Members from "../components/Members";
import Account from "../components/Account";
import univ from "../assets/gurumton.svg";
import RecordPage from "./RecordPage";

const API_URL = 'https://dongari-eum-backend.onrender.com/';

function ClubMain() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("monthly");
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  // 클럽 정보만 요청
  useEffect(() => {
    async function fetchClub() {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}clubs/${id}`);
        setClub(res.data);
      } catch (e) {
        alert(`${e} 클럽 정보를 불러오지 못했습니다.`);
      } finally {
        setLoading(false);
      }
    }
    fetchClub();
  }, [id]);

  // 탭에 따른 콘텐츠 렌더링
  const renderContent = () => {
    switch(activeTab) {
      case "monthly": return <Calendar />;
      case "yearly": return <Year />;
      case "member": return <Members />;
      case "accounting": return <Account />;
      case "record": return <RecordPage />;
      default: return <Calendar />;
    }
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo-section">
          <img src={logo} alt="동아리음 로고" className="logo" />
        </div>
        <div className="user-info">
          <img
            src={club && club.image_url ? `${API_URL}${club.image_url}` : univ}
            alt="클럽 프로필"
            className="profile-img"
            onError={e => { e.target.src = univ; }}
          />
          <span className="user-name">
            {club ? club.name : "로딩중..."}
          </span>
        </div>
        <nav className="menu">
          <button 
            className={`menu-item ${activeTab === "monthly" ? "active" : ""}`}
            onClick={() => setActiveTab("monthly")}
          >
            <img src={month} alt="월간기록" />
            월간기록
          </button>
          <button 
            className={`menu-item ${activeTab === "yearly" ? "active" : ""}`}
            onClick={() => setActiveTab("yearly")}
          >
            <img src={year} alt="연간기록" />
            연간기록
          </button>
          <button 
            className={`menu-item ${activeTab === "member" ? "active" : ""}`}
            onClick={() => setActiveTab("member")}
          >
            <img src={member} alt="부원관리" />
            부원관리
          </button>
          <button 
            className={`menu-item ${activeTab === "accounting" ? "active" : ""}`}
            onClick={() => setActiveTab("accounting")}
          >
            <img src={account} alt="회계관리" />
            회계관리
          </button>
        </nav>
        <button 
          className="record-btn"
          onClick={() => setActiveTab("record")}
        >
          기록하기
        </button>
      </aside>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default ClubMain;
