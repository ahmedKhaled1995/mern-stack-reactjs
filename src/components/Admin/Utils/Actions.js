import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import "./actions.css";

const Actions = (props) => {
    return (
        <div className="d-flex">
            <FontAwesomeIcon icon={faTrash} className="actionItem" onClick={props.handleDelete} />
            <FontAwesomeIcon icon={faEdit} className="actionItem" onClick={props.handleEdit} />
        </div>
    )
}

export default Actions;
