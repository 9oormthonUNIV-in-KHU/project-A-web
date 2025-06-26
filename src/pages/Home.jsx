import "../styles/Home.css"
import logo from "../assets/dongarieum.svg"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const nav = useNavigate();

  const onClickLogin = () => {
    nav("/login")
  }

  const onClickLogo = () => {
    nav("/")
  }
  return (
    <div className="home-bg">
      <div className="home-header">
        <img src={logo} alt="동아리음 로고" className="home-logo" onClick={onClickLogo}/>
        <button className="home-login-button" onClick={onClickLogin}>로그인</button>
      </div>
    </div>
  )
}
