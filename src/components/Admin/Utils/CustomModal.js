import { Button, Modal } from 'react-bootstrap';

const CustomModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
          </Button>
                {/* <Button variant="primary" onClick={props.handleClose}>
                    Submit
          </Button> */}
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;
