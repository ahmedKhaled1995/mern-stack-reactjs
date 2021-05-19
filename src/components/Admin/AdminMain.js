import { useState } from "react";

import { Container, Row, Col } from 'react-bootstrap';
import AdminNav from "./AdminNav";

const AdminMain = (props) => {

    const [categoriesChoosen, setCategoriesChosen] = useState(true);
    const [authorsChoosen, setAuthorsChosen] = useState(false);
    const [boohsChoosen, setBooksChosen] = useState(false);

    const handleLinkClicked = (link) => {
        // console.log(link);
        if (link === "categories") {
            setCategoriesChosen(true);
            setAuthorsChosen(false);
            setBooksChosen(false);
        } else if (link === "authors") {
            setCategoriesChosen(false);
            setAuthorsChosen(true);
            setBooksChosen(false);
        } else {
            setCategoriesChosen(false);
            setAuthorsChosen(false);
            setBooksChosen(true);
        }
    };

    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <AdminNav
                        categoriesChoosen={categoriesChoosen}
                        authorsChoosen={authorsChoosen}
                        booksChoosen={boohsChoosen}
                        handleLinkClicked={handleLinkClicked}
                    /></Col>
                <Col sm={9}>Content 4</Col>
            </Row>
        </Container>
    )
}

export default AdminMain;
