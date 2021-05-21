import { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';

import "./input.css";

const Input = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [fileObj, setFileObj] = useState({});

    useEffect(() => {
        if (props.firstName) setFirstName(props.firstName);
        if (props.lastName) setLastName(props.lastName);
        if (props.dateOfBirth) setDateOfBirth(props.dateOfBirth)
    }, []);

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First name"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last name"
                    value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date"
                    value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </Form.Group>

            <div className="form-group mt-2">
                <label className="mb-2">Author Picture</label>
                <input type="file" className="form-control" onChange={(e) => { setFileObj(e.target.files[0]) }} />
            </div>



            <div className="center">
                <Button variant="primary" type="submit" onClick={(e) => props.handleSubmit(e, firstName, lastName, dateOfBirth, fileObj)}>
                    Submit
            </Button>
            </div>

        </Form>
    )
}

export default Input;
