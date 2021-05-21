import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import './auth.css';

const Signup = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fileObj, setFileObj] = useState({});
    const history = useHistory();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Forming the signup body
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
        localStorage.setItem("_id", userData.user._id);
        localStorage.setItem("firstName", userData.user.firstName);
        localStorage.setItem("lastName", userData.user.lastName);
        localStorage.setItem("isAdmin", userData.user.isAdmin);
        props.handleAuth(userData.token);

        // Now we upload the img (profile picture)
        const imgData = new FormData();
        const file = fileObj;
        imgData.append("avatar", file);
        await axios.post(
            "http://localhost:5000/users/me/avatar",
            imgData,
            { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userData.token}` } }
        );

        // Now we redirect to the landing page
        history.push('/books');
    };

    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setFileObj(e.target.files[0]);
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

                    <div className="form-group">
                        <label>Profile Picture</label>
                        <input type="file" className="form-control" onChange={(e) => handleFileChange(e)} />
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
