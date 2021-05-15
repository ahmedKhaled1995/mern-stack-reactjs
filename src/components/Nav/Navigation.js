import { Navbar, Nav, Form, FormControl, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Navigation = (props) => {

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search entered");
    };

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
                            <Nav.Link as={Link} to="/books">Books</Nav.Link>
                            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
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
