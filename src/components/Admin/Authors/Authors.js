import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';

import loadData from "../../../helpers/loadData";
import formatDate from "../../../helpers/formatDate";
import Actions from "../Utils/Actions";
import CustomModal from "../Utils/CustomModal";
import Input from "./Input";

import placeHolderImage from "./placeholder.png";

const Authors = () => {

    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState({ _id: "", firstName: "", lastName: "", dateOfBirth: "" });

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData("http://localhost:5000/authors");
            console.log(data);
            if (data.error) {
                setError(true);
            } else {
                setAuthors(data);
            }
        };
        fetchData();
    }, []);

    const handleCloseModal = () => {
        setItemToEdit({ _id: "", firstName: "", lastName: "", dateOfBirth: "" });
        setShowModal(false);
    };

    const handleShowModal = () => {
        // console.log(itemToEdit);
        setShowModal(true);
    };

    const handleDeleteAuthor = async (_id) => {
        await axios.delete(
            `http://localhost:5000/authors/${_id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        let authorsCopy = [...authors];
        authorsCopy = authorsCopy.filter((item) => {
            return (item._id !== _id)
        });
        setAuthors(authorsCopy);
    };

    const handleEditAuthor = (_id, firstName, lastName, dateOfBirth, avatar) => {
        const formatedDateOfBirth = formatDate(dateOfBirth);
        // console.log(formatedDateOfBirth);
        setItemToEdit({ _id, firstName, lastName, dateOfBirth: formatedDateOfBirth, avatar });
        handleShowModal();
    };

    const handleSubmit = async (e, firstName, lastName, dateOfBirth, fileObj) => {
        e.preventDefault();
        let _id = null;
        if (itemToEdit._id) {  // Patch
            const data = await axios.patch(
                `http://localhost:5000/authors/${itemToEdit._id}`,
                { firstName, lastName, dateOfBirth },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            const dataObj = data.data;
            _id = dataObj._id;
            const authorsCopy = [...authors];
            authorsCopy.forEach((item) => {
                if (item._id === dataObj._id) {
                    item.firstName = dataObj.firstName;
                    item.lastName = dataObj.lastName;
                    item.dateOfBirth = dataObj.dateOfBirth;
                }
            });
            setAuthors(authorsCopy);
        } else {  // Post
            const data = await axios.post(
                "http://localhost:5000/authors",
                { firstName, lastName, dateOfBirth },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            const dataObj = data.data.author;
            _id = dataObj._id;
            // console.log(dataObj);
            setAuthors([...authors, dataObj]);
        }
        // Then we upload image if provided
        if (fileObj.name && _id) {
            console.log("image was provided");
            const imgData = new FormData();
            const file = fileObj;
            imgData.append("avatar", file);
            await axios.post(
                `http://localhost:5000/authors/${_id}/avatar`,
                imgData,
                { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        }
        handleCloseModal();
    };

    return (
        <>
            <Button variant="primary" className="mb-2" onClick={handleShowModal}>
                Add
            </Button>

            <CustomModal
                show={showModal}
                handleShow={handleShowModal}
                handleClose={handleCloseModal}
            >
                <Input
                    firstName={itemToEdit.firstName}
                    lastName={itemToEdit.lastName}
                    dateOfBirth={itemToEdit.dateOfBirth}
                    handleSubmit={handleSubmit} />
            </CustomModal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date Of Birth</th>
                        <th>Picture</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{formatDate(item.dateOfBirth)}</td>
                                <td><img
                                    src={item.avatar ? `http://localhost:5000/authors/${item._id}/avatar` : placeHolderImage}
                                    alt="No Image"
                                    width="50"
                                    height="50" />
                                </td>
                                <td>
                                    <Actions
                                        handleDelete={() => handleDeleteAuthor(item._id)}
                                        handleEdit={() => handleEditAuthor(item._id, item.firstName, item.lastName, item.dateOfBirth, item.avatar)}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>

    )
}

export default Authors;
