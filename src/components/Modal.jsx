import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseBtn from '../../assets/close.svg';
import Univ from '../../assets/gurumton.svg';

import '../../styles/modal/modal.css';

export default function Modal({ isOpen, onClose }) {
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updateCode = [...verificationCode];
      updateCode[index] = value;
      setVerificationCode(updateCode);

      if (value && index < 5) {
        document
          .querySelector(`input[name="verification-${index + 1}"]`)
          ?.focus();
      }
    }
  };

  const isActive = verificationCode.every((digit) => digit !== '');

  const joinButton = () => {
    navigate('/search');
  };
  if (!isOpen) return null;

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal-in" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <img src={CloseBtn} alt="close" />
        </button>
        <div>
          <div className="modalTitleWrapper">
            <img src={Univ} alt="univ" className="univImg" />
            <div className="title">
              <div>
                <h1>구름톤 유니브</h1>
                <span>연합</span>
                <span>IT</span>
              </div>
              <p>카카오와 구름이 함께하는 전국 대학 IT 연합 동아리</p>
            </div>
          </div>
        </div>
        <div className="codeWrapper">
          <h3>입장코드</h3>
          <div className="inputWrapper">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>
                <input
                  name={`verification-${index}`}
                  maxLength={1}
                  value={verificationCode[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  type="text"
                  tabIndex={index + 1}
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <div className="btnWrapper">
          <button
            className={`clickBtn ${isActive ? 'active' : 'inactive'}  `}
            disabled={!isActive}
            onClick={joinButton}
          >
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
}
