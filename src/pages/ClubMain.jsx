import React, { useState } from "react";
import "../styles/ClubMain.css";
import logo from "../assets/violetdong.svg"
import month from "../assets/month.svg"
import year from "../assets/year.svg"
import member from "../assets/member.svg"
import account from "../assets/account.svg"
import Calendar from "../components/Calendar";
import Year from "../components/Year";
import Members from "../components/Members";
import Account from "../components/Account";
import univ from "../assets/gurumton.svg"
import RecordPage from "./RecordPage";

function ClubMain() {

  // 현재 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState("monthly");
  
  // 탭 변경 핸들러
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // 탭에 따른 콘텐츠 렌더링
  const renderContent = () => {
    switch(activeTab) {
      case "monthly":
        return <Calendar />;
      case "yearly":
        return <Year />;
      case "member":
        return <Members />;
      case "accounting":
        return <Account />;
      case "record":
        return <RecordPage />;
      default:
        return <Calendar />;
    }
  };

  return (
    <div className="container">
      {/* 사이드바 */}
      <aside className="sidebar">
        <div className="logo-section">
          <img src={logo} alt="동아리음 로고" className="logo" />
        </div>
        <div className="user-info">
            <img
                src={univ}
                alt="프로필"
                className="profile-img"
            />
            <span className="user-name">
                구름톤 유니브
            </span>
            </div>
        <nav className="menu">
          {/* 탭 버튼 - 클릭 시 activeTab 상태 업데이트 */}
          <button 
            className={`menu-item ${activeTab === "monthly" ? "active" : ""}`}
            onClick={() => handleTabChange("monthly")}
          >
            <img src={month} alt="월간기록" />
            월간기록
          </button>
          <button 
            className={`menu-item ${activeTab === "yearly" ? "active" : ""}`}
            onClick={() => handleTabChange("yearly")}
          >
            <img src={year} alt="연간기록" />
            연간기록
          </button>
          <button 
            className={`menu-item ${activeTab === "member" ? "active" : ""}`}
            onClick={() => handleTabChange("member")}
          >
            <img src={member} alt="부원관리" />
            부원관리
          </button>
          <button 
            className={`menu-item ${activeTab === "accounting" ? "active" : ""}`}
            onClick={() => handleTabChange("accounting")}
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

      {/* 메인 컨텐츠 - 활성 탭에 따라 다른 컴포넌트 렌더링 */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default ClubMain;
