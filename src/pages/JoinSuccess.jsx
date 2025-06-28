import axios from 'axios';
import '../styles/JoinSuccess.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
const API_URL = 'https://dongari-eum-backend.onrender.com';

export default function JoinSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [club, setClub] = useState(null);
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await axios.get(`${API_URL}/clubs/${id}`);
        setClub(response.data);
      } catch (error) {
        console.error('동아리 정보를 불러오는 데 실패했어요.', error);
      }
    };

    if (id) fetchClub();
  }, [id]);
  console.log(club);

  if (!club) {
    return <div className="completeWrapper">로딩 중...</div>;
  }
  return (
    <div className="completeWrapper">
      <img
        src={`${API_URL}/${club.image_url}`}
        alt="동아리_이미지"
        className="imgStyle"
      />
      <div className="titleWrapper">
        <h1 className="title">{club.name}</h1>
        <p>동아리 참여를 시작해요!</p>
      </div>
      <button
        className="button"
        onClick={() => {
          navigate(`/club/${id}`);
        }}
      >
        내 동아리 보러가기
      </button>
    </div>
  );
}
