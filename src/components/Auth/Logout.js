import { useEffect } from "react";

import { Redirect } from "react-router-dom";

import axios from "axios";

const Logout = (props) => {

    useEffect(() => {
        const token = localStorage.getItem("token");
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("isAdmin");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const logout = async () => {
            await axios.post("http://localhost:5000/users/logout", {}, config);
        };

        logout();

        props.handleLogout();
    }, []);



    return (
        <div>
            <Redirect to="/" />
        </div>
    )
}

export default Logout;