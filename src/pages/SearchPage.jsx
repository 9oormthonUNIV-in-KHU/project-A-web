import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import logo from '../assets/dongarieum.svg';
import searchIcon from '../assets/dotbogi.svg';
import gurumton from '../assets/gurumton.svg'

const items = [
  {
    id: 1,
    name: '구름톤 유니브',
    description: '카카오와 구름이 함께하는 전국 대학 IT 연합 동아리',
    image: gurumton
  },
  {
    id: 2,
    name: '구름톤 유니브',
    description: '카카오와 구름이 함께하는 전국 대학 IT 연합 동아리',
    image: gurumton
  },
  {
    id: 3,
    name: '구름톤 유니브',
    description: '카카오와 구름이 함께하는 전국 대학 IT 연합 동아리',
    image: gurumton
  },
  {
    id: 4,
    name: '구름톤 유니브',
    description: '카카오와 구름이 함께하는 전국 대학 IT 연합 동아리',
    image: gurumton
  }
];

function SearchPage() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const nav = useNavigate();

  const filteredItems = items.filter(
    item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  const isEmpty = query.trim() === '';

  const onClickLogo = () => {
    nav("/");
  }

  return (
    <div className="search-bg">
      <header className="search-header">
        <img src={logo} alt="동아리음 로고" className="search-logo-img" onClick={onClickLogo}/>
      </header>
      <div className="search-top-section">
        <h2 className="search-title">내 동아리를 찾아볼까요?</h2>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder={isFocused ? '' : '검색어를 입력하세요.'}            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="search-input"
          />
          <img src={searchIcon} alt="검색" className="search-input-icon" />
        </div>
      </div>
      <div className="search-result-area">
        {isEmpty ? (
          <div className="search-empty">
            동아리 이름 혹은 설명을<br />검색해보세요!
            <div className="search-create-link">
              <a href="#">새로운 동아리를 만들래요!</a>
            </div>
          </div>
        ) : (
          <>
            <ul className="search-list">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <li key={item.id} className="search-list-item">
                    <img src={item.image} alt={item.name} className="search-item-img" />
                    <div className="search-item-info">
                      <div className="search-item-title">{item.name}</div>
                      <div className="search-item-desc">{item.description}</div>
                    </div>
                    <button className="search-item-join">참여</button>
                  </li>
                ))
              ) : (
                <li className="search-no-result">
                  찾는 동아리가 없어요!<br/>내가 만들어볼까요?
                </li>
              )}
            </ul>
            <div className="search-create-link search-create-link-bottom">
              <a href="#">새로운 동아리를 만들래요!</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
