import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";

const Login = (props) => {

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const inputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setLoginData({
            ...loginData,
            [name]: target.value,
        })
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        axios.post("https://akademia108.pl/api/social-app/user/login", {
            username: loginData.username,
            password: loginData.password,
        })
            .then(res => {
                if (Array.isArray(res.data.username)) {
                    setMessage(res.data.username[0])
                } else if (Array.isArray(res.data.password)) {
                    setMessage(res.data.password[0])
                } else if (res.data.error) {
                    setMessage("Incorrect username or password")
                } else {
                    setMessage("");
                    props.setUser(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
            })
            .catch(error => { console.error(error); });

    }

    return (
        <div className="login">
            {props.user && <Navigate to="/"/>}
            <form className="login" onSubmit={loginSubmit}>
                {message && <h3>{message}</h3>}
                <input type="text" name="username" placeholder="User name" value={loginData.username} onChange={inputChange} />
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={inputChange} />
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
};

export default Login;