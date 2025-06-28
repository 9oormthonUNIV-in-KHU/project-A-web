import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CloseBtn from '../assets/close.svg';

import '../styles/modal.css';

const API_URL = 'https://dongari-eum-backend.onrender.com';

export default function Modal({ isOpen, onClose, club }) {
  const [verificationCode, setVerificationCode] = useState(Array(6).fill(''));
  const navigate = useNavigate();
  const passwordInputs = useRef([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen && passwordInputs.current[0]) {
      passwordInputs.current[0].focus();
    }
  }, [isOpen]);

  const resetModalState = () => {
    setVerificationCode(Array(6).fill(''));
    setErrorMessage('');
  };

  const handlePasswordChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newPassword = [...verificationCode];
      newPassword[index] = value;
      setVerificationCode(newPassword);

      if (index < 5) {
        passwordInputs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newPassword = [...verificationCode];
      newPassword[index] = '';
      setVerificationCode(newPassword);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      passwordInputs.current[index - 1].focus();
    }
  };

  const isActive = verificationCode.every((digit) => digit !== '');

  const joinButton = async () => {
    const password = verificationCode.join('');
    try {
      await axios.post(`${API_URL}/clubs/join`, {
        name: club.name,
        password: password,
      });

      navigate(`/join-success/${club.id}`);
    } catch (error) {
      const msg = error.response?.data.message || '⚠️ 입장코드가 달라요!';
      setErrorMessage(msg);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-back"
      onClick={() => {
        resetModalState();
        onClose();
      }}
    >
      <div className="modal-in" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={() => {
            resetModalState();
            onClose();
          }}
        >
          <img src={CloseBtn} alt="close" />
        </button>
        <div>
          <div className="modalTitleWrapper">
            <img
              src={`${API_URL}/${club.image_url}`}
              alt="univ"
              className="univImg"
            />
            <div className="title">
              <div>
                <h1>{club.name}</h1>
                <span>{club.club_type}</span>
                <span>IT</span>
              </div>
              <p>{club.description}</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isActive) joinButton();
          }}
        >
          <div className="codeWrapper">
            <h3>입장코드</h3>
            <div className="inputWrapper">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <input
                    name={`verification-${index}`}
                    maxLength={1}
                    value={verificationCode[index]}
                    onChange={(e) => handlePasswordChange(e, index)}
                    type="text"
                    tabIndex={index + 1}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (passwordInputs.current[index] = el)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="btnWrapper">
            <button
              type="submit"
              className={`${
                isActive ? 'clickBtn active' : 'clickBtn inactive'
              } ${errorMessage ? 'error-btn' : ''}`}
              disabled={!isActive}
            >
              참여하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
