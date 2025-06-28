import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SearchPage.css';
import logo from '../assets/dongarieum.svg';
import searchIcon from '../assets/dotbogi.svg';
import Modal from '../components/Modal';

const API_URL = 'https://dongari-eum-backend.onrender.com/';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 검색 실행 여부 추적
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true); // 검색 실행됨
    setLoading(true);

    try {
      if (searchTerm.trim()) {
        const response = await axios.get(
          `${API_URL}clubs?name=${encodeURIComponent(searchTerm)}`
        );
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('동아리 검색 실패:', error);
      alert('동아리 검색에 실패했습니다.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const onClickLogo = () => nav('/');
  const onClickCreateClub = () => nav('/create-club');

  return (
    <div className="search-bg">
      <header className="search-header">
        <img
          src={logo}
          alt="동아리음 로고"
          className="search-logo-img"
          onClick={onClickLogo}
        />
      </header>
      <div className="search-top-section">
        <h2 className="search-title">내 동아리를 찾아볼까요?</h2>
        <form className="search-input-wrapper" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-input-icon-btn">
            <img src={searchIcon} alt="검색" className="search-input-icon" />
          </button>
        </form>
      </div>
      <div className="search-result-area">
        {loading ? (
          <div className="search-empty">검색 중...</div>
        ) : !hasSearched ? ( // 아직 검색을 실행하지 않은 초기 상태
          <div className="search-empty">
            동아리 이름 혹은 설명을
            <br />
            검색해보세요!
          </div>
        ) : searchResults.length === 0 ? ( // 검색 실행 후 결과 없음
          <div className="search-empty">
            찾는 동아리가 없어요!
            <br />
            내가 만들어볼까요?
          </div>
        ) : (
          // 검색 결과 있음
          <ul className="search-list">
            {searchResults.map((club) => (
              <li key={club.id} className="search-list-item">
                <img
                  src={API_URL + club.image_url || logo}
                  alt={club.name}
                  className="search-item-img"
                />
                <div className="search-item-info">
                  <div className="search-item-title">{club.name}</div>
                  <div className="search-item-desc">{club.description}</div>
                </div>
                <button
                  className="search-item-join"
                  onClick={() => setIsModalOpen(true)}
                >
                  참여
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="search-create-button" onClick={onClickCreateClub}>
          새로운 동아리를 만들래요!
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default SearchPage;
