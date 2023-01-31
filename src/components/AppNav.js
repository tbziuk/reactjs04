import axios from "axios";
import { Link, Navigate } from "react-router-dom"
import "./AppNav.css";

const AppNav = (props) => {

    const logOut = (e) => {
        e.preventDefault();

        axios.post("https://akademia108.pl/api/social-app/user/logout")
            .then(res => {
                console.log(res.data);
                if (res.data.message) {
                    props.setUser(null);
                    localStorage.setItem('user', null);
                }
            })
            .catch(error => console.error(error))

            return (<Navigate to="/" />)
    }

    return (
        <nav className="mainNav">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!props.user && <li>
                    <Link to="/login">Login</Link>
                </li>}
                {!props.user && <li>
                    <Link to="/signup">SignUp</Link>
                </li>}
                {props.user && <li><Link onClick={logOut}>Logout</Link></li>}
            </ul>
        </nav>
    )
}

export default AppNav;