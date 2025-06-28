import Univ from '../assets/gurumton.svg';

import '../styles/JoinSuccess.css';
import { useNavigate } from 'react-router-dom';

export default function JoinSuccess() {
  const navigate = useNavigate();
  return (
    <div className="completeWrapper">
      <img src={Univ} alt="동아리_이미지" className="imgStyle" />
      <div className="titleWrapper">
        <h1 className="title">구름톤유니브</h1>
        <p>동아리 참여를 시작해요!</p>
      </div>
      <button
        className="button"
        onClick={() => {
          navigate('/club');
        }}
      >
        내 동아리 보러가기
      </button>
    </div>
  );
}
