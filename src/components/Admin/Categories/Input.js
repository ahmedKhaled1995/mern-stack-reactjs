import { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';

import "./input.css";

const Input = (props) => {

    const [name, setName] = useState('');

    useEffect(() => {
        if (props.name) setName(props.name);
    }, []);

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Category name"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <div className="center">
                <Button variant="primary" type="submit" onClick={(e) => props.handleSubmit(e, name)}>
                    Submit
            </Button>
            </div>

        </Form>
    )
}

export default Input;
