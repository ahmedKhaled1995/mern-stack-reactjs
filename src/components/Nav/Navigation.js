import axios from "axios";
import { useState, useEffect } from "react";

import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

import profilePicturePlaceHolder from "./profile_pic.png";

const Navigation = (props) => {

    const [avatarFound, setAvatarFound] = useState(false);

    useEffect(() => {
        const getAvatar = async () => {
            try {
                const imgData = await axios.get(
                    `http://localhost:5000/users/${localStorage.getItem("_id")}/avatar?${Math.random()}`,
                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                );
                setAvatarFound(true);
            } catch (error) {
                setAvatarFound(false);
            }
        };
        getAvatar();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search entered");
    };

    const profilePic = (<img
        src={avatarFound ? `http://localhost:5000/users/${localStorage.getItem("_id")}/avatar?${Math.random()}` :
            profilePicturePlaceHolder}
        alt="me"
        width="30"
        height="30" />
    );

    return (
        <Navbar bg="primary" expand="lg" className="mb-3" >
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {!props.token ? "" : <>
                            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                            <Nav.Link as={Link} to="/mybooks">Mybooks</Nav.Link>
                            <Nav.Link as={Link} to="/books">Books</Nav.Link>
                            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            <Nav.Link as={Link} to="/me">
                                {profilePic}
                            </Nav.Link>
                        </>}
                    </Nav>
                    <Form inline onSubmit={(e) => { handleSearch(e) }}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
