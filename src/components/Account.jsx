import '../styles/account.css';
import Picture from '../assets/picture.svg';
import Pencil from '../assets/pencil.svg';
import Trash from '../assets/trash.svg';
const ACCOUNT = ['날짜', '담당자', '내용', '금액', '총액', ' '];

export default function Account() {
  return (
    <div className="account-styling">
      <div className="account-title">회계관리</div>
      <div className="account-content">
        <div className="btn-wrapper">
          <button className="send-btn">내보내기</button>
        </div>
        <div>
          <div className="content-title">
            {ACCOUNT.map((item) => (
              <div className="content-title-style">{item}</div>
            ))}
          </div>
          <div className="input-wrapper">
            <input type="text" className="input-style" />
            <input type="text" className="input-style" />
            <input type="text" className="input-style" />
            <input type="text" className="input-style" />
            <input type="text" className="total-style" disabled />
            <button className="photo">사진 첨부</button>
            <button className="save-button">저장</button>
          </div>
          <div className="account-record-wrapper">
            <div className="account-record">2025.06.01</div>
            <div className="account-record">유니브 구름톤</div>
            <div className="account-record">뒤풀이</div>
            <div className="account-record">500,000원</div>
            <div className="account-record" disabled>
              500,000원
            </div>
            <div className="picture-wrapper">
              <button className="picture">
                <img src={Picture} alt="" />
              </button>
              <button className={`picture pencil`}>
                <img src={Pencil} alt="" />
              </button>
              <button className={`picture trash`}>
                <img src={Trash} alt="" />
              </button>
            </div>
          </div>
          <button className="plus-content-btn">+ 내역 추가</button>
        </div>
      </div>
    </div>
  );
}
