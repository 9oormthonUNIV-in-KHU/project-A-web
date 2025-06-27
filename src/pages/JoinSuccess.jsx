import Univ from '../assets/gurumton.svg';

import '../styles/JoinSuccess.css';
import Modal from '../components/Modal';

import { useState } from 'react';

export default function JoinSuccess() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="completeWrapper">
      <img src={Univ} alt="동아리_이미지" className="imgStyle" />
      <div className="titleWrapper">
        <h1 className="title">구름톤유니브</h1>
        <p>동아리 참여를 시작해요!</p>
      </div>
      <button className="button" onClick={() => setIsModalOpen(true)}>
        내 동아리 보러가기
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
