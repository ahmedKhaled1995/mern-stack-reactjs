import { useState } from "react";

import { Container, Row, Col } from 'react-bootstrap';

import AdminNav from "./AdminNav";
import Categories from "./Categories/Categories";
import Authors from "./Authors/Authors";
import Books from "./Books/Books";

const AdminMain = (props) => {

    const [categoriesChoosen, setCategoriesChosen] = useState(true);
    const [authorsChoosen, setAuthorsChosen] = useState(false);
    const [booksChoosen, setBooksChosen] = useState(false);

    // A method that handle updating the state to know which link (categories, books or authors) is choosen
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

    // Defining a variable holding the component to be rendered depending on the link choosen
    // Note that by default it's categories
    let crudComponent = <Categories />;
    if (authorsChoosen) crudComponent = <Authors />
    else if (booksChoosen) crudComponent = <Books />

    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <AdminNav
                        categoriesChoosen={categoriesChoosen}
                        authorsChoosen={authorsChoosen}
                        booksChoosen={booksChoosen}
                        handleLinkClicked={handleLinkClicked}
                    /></Col>
                <Col sm={9}>
                    {crudComponent}
                </Col>
            </Row>
        </Container>
    )
}

export default AdminMain;
