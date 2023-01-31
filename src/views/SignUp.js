import "./SignUp.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const SignUp = (props) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [signUpProcess, setSignUpProcess] = useState("");
    
    const [signedUp, setSignedUp] = useState(false);

    const validation = () => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false,
        }
        // username
        if (formData.username.trim().length < 4) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return { ...prevErrors, username: "Username should have at least 4 characters" }
            });
        } else if (!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors(prevErrors => {
                return { ...prevErrors, username: "Username should not have blank spaces" }
            });
        }
        else {
            validationErrors.username = false;
            setErrors(prevErrors => {
                return { ...prevErrors, username: "" }
            });
        };
        //email
        if (formData.email.trim().length < 1) {
            validationErrors.email = true;
            setErrors(prevErrors => {
                return { ...prevErrors, email: "Email input should not be empty" }
            });
        } else if (!/^[^\s]*$/.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors => {
                return { ...prevErrors, email: "Email address should not have blank spaces" }
            });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
            validationErrors.email = true;
            setErrors(prevErrors => {
                return { ...prevErrors, email: "Incorrect Email address" }
            });
        }
        else {
            validationErrors.email = false;
            setErrors(prevErrors => {
                return { ...prevErrors, email: "" }
            });
        };
        //password
        if (formData.password.trim().length < 6) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return { ...prevErrors, password: "Password should have at least 6 characters" }
            });
        } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return { ...prevErrors, password: "Password should have special characters: ! # @ $ %" }
            });
        } else if (!/[0-9*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors(prevErrors => {
                return { ...prevErrors, password: "Password should have at least one number" }
            });
        } else {
            validationErrors.password = false;
            setErrors(prevErrors => {
                return { ...prevErrors, password: "" }
            });
        };
        //confirmPassword
        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors(prevErrors => {
                return { ...prevErrors, confirmPassword: "Passwords should be the same" }
            });
        }
        else {
            validationErrors.confirmPassword = false;
            setErrors(prevErrors => {
                return { ...prevErrors, confirmPassword: "" }
            });
        };


        return (!validationErrors.username &&
            !validationErrors.email &&
            !validationErrors.password &&
            !validationErrors.confirmPassword
        )
    };

    const inputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value,
        })
    }
    const inputSubmit = (e) => {
        e.preventDefault()

        if (!validation()) {
            return
        }

        axios
            .post("https://akademia108.pl/api/social-app/user/signup", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            })
            .then(res => {

                if (res.data.signedup) {
                    setSignUpProcess("Account created");
                    setSignedUp(true);
                } else {
                    if (res.data.message.username) {
                        setSignUpProcess(res.data.message.username[0])
                    } else if (res.data.message.email) {
                        setSignUpProcess(res.data.message.email[0])
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (
        <div className="login">
            {props.user && <Navigate to="/" />}
            <form className="login" onSubmit={inputSubmit}>
                {signUpProcess && <h2>{signUpProcess}</h2>}
                {errors.username && <p>{errors.username}</p>}
                <input type="text" name="username" placeholder="User name" onChange={inputChange} />
                {errors.email && <p>{errors.email}</p>}
                <input type="email" name="email" placeholder="Email Address" onChange={inputChange} />
                {errors.password && <p>{errors.password}</p>}
                <input type="password" name="password" placeholder="Password" onChange={inputChange} />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={inputChange} />
                <button type="submit" className="btn" disabled={signedUp}>Signup</button>
                {signedUp && <button type="submit" className="btn link">
                    <Link to={"/login"} >Login</Link>
                </button>}
            </form>
        </div>
    )
};

export default SignUp;