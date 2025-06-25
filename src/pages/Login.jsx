import "../styles/Login.css"
import { useNavigate } from "react-router-dom"
import logo from "../assets/dongarieum.svg"

export default function Login() {
    const nav = useNavigate();

    const onClickLogo = () => {
        nav("/")
    }

    return (
        <div className="login-body">
            <div className="login-header">
                <img src={logo} alt="동아리음 로고" onClick={onClickLogo} className="logo"/>
            </div>
        </div>
    )
}