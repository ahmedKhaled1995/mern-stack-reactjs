import { Button } from 'react-bootstrap';

const AdminNav = (props) => {
    return (
        <div className="d-flex flex-column ">
            <Button
                variant={props.categoriesChoosen ? `info` : `primary`}
                className="mb-2"
                onClick={(e) => { props.handleLinkClicked('categories') }}
            >
                Categories
            </Button>
            <Button
                variant={props.authorsChoosen ? `info` : `primary`}
                className="mb-2"
                onClick={(e) => { props.handleLinkClicked('authors') }}
            >
                Authors
            </Button>
            <Button
                variant={props.booksChoosen ? `info` : `primary`}
                className="mb-2"
                onClick={(e) => { props.handleLinkClicked('books') }}
            >
                Books
            </Button>
        </div>
    )
}

export default AdminNav;
