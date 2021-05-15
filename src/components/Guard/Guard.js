import { Fragment } from "react";
import { Redirect } from "react-router-dom";


const Guard = (props) => {

    return (
        <Fragment>
            { localStorage.getItem("token") ? props.children : <Redirect to="/" />}
        </Fragment>
    )
}

export default Guard;