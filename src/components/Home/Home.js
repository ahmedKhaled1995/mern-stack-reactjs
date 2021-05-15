import { useState } from "react";

import { Container, Row, Col } from 'react-bootstrap';

import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

const Home = (props) => {

    const [loginChoosen, setLoginChosen] = useState(false);

    const handelAuthToggle = (e) => {
        e.preventDefault();
        setLoginChosen(!loginChoosen);
    };

    return (
        <Container>
            <Row>
                <Col sm={8}>Content</Col>
                <Col sm={4}>
                    {loginChoosen ?
                        <Login handelAuthToggle={handelAuthToggle} handleAuth={props.handleAuth}></Login> :
                        <Signup handelAuthToggle={handelAuthToggle} handleAuth={props.handleAuth}></Signup>}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
