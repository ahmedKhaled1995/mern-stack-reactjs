import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import './auth.css';

const Signup = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const body = {
            email,
            password,
            firstName,
            lastName,
            isAdmin: false
        };
        const data = await axios.post("http://localhost:5000/users", body);
        const userData = data.data;
        console.log(userData.token);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("firstName", userData.user.firstName);
        localStorage.setItem("lastName", userData.user.lastName);
        localStorage.setItem("isAdmin", userData.user.isAdmin);
        props.handleAuth(userData.token);
        history.push('/books');
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={(e) => { handleFormSubmit(e) }}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name"
                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-3">Sign Up</button>
                    <div className="forgot-password text-right">
                        <span>Already registered?</span>
                        <button className="btn btn-link mb-1 " onClick={(e) => props.handelAuthToggle(e)}>sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
