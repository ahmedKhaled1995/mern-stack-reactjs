import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';

import loadData from "../../../helpers/loadData";
import Actions from "../Utils/Actions";
import CustomModal from "../Utils/CustomModal";
import Input from "./Input";

import placeHolderImage from "./placeholder.png";

const Books = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState({ _id: "", bookName: "", category: "", author: "" });

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData("http://localhost:5000/books");
            console.log(data);
            if (data.error) {
                setError(true);
            } else {
                setBooks(data);
            }
        };
        fetchData();
    }, []);

    const handleCloseModal = () => {
        setItemToEdit({ _id: "", bookName: "", category: "", author: "" });
        setShowModal(false);
    };

    const handleShowModal = () => {
        // console.log(itemToEdit);
        setShowModal(true);
    };

    const handleDeleteBook = async (_id) => {
        await axios.delete(
            `http://localhost:5000/books/${_id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        let booksCopy = [...books];
        booksCopy = booksCopy.filter((item) => {
            return (item._id !== _id)
        });
        setBooks(booksCopy);
    };

    const handleEditBook = (_id, bookName, category, author, avatar) => {
        setItemToEdit({ _id, bookName, category, author, avatar });
        handleShowModal();
    };

    const handleSubmit = async (e, bookName, category, author, fileObj) => {
        e.preventDefault();
        let _id = null;
        if (itemToEdit._id) {  // Patch
            // console.log(category);
            // console.log(author);
            const data = await axios.patch(
                `http://localhost:5000/books/${itemToEdit._id}`,
                { bookName, category, author },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            const dataObj = data.data;
            console.log(dataObj);
            _id = dataObj._id;
            const booksCopy = [...books];
            booksCopy.forEach((item) => {
                if (item._id === dataObj._id) {
                    item.bookName = dataObj.bookName;
                    item.category = dataObj.category;
                    item.author = dataObj.author;
                }
            });
            setBooks(booksCopy);
        } else {  // Post
            const data = await axios.post(
                "http://localhost:5000/books",
                { bookName, category, author },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            const dataObj = data.data.book;
            _id = dataObj._id;
            console.log(dataObj);
            setBooks([...books, dataObj]);
        }
        // Then we upload image if provided
        if (fileObj.name && _id) {
            console.log("image was provided");
            const imgData = new FormData();
            const file = fileObj;
            imgData.append("avatar", file);
            await axios.post(
                `http://localhost:5000/books/${_id}/avatar`,
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
                    bookName={itemToEdit.bookName}
                    categoryName={itemToEdit.category.name}
                    categoryId={itemToEdit.category._id}
                    authorName={itemToEdit.author ? itemToEdit.author.firstName + ", " + itemToEdit.author.lastName : null}
                    authorId={itemToEdit.author._id}
                    handleSubmit={handleSubmit} />
            </CustomModal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Name</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Picture</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.bookName}</td>
                                <td>{item.category.name}</td>
                                <td>{item.author.firstName + ", " + item.author.lastName}</td>
                                <td><img
                                    src={item.avatar ? `http://localhost:5000/books/${item._id}/avatar?${Math.random()}` : placeHolderImage}
                                    alt="No Image"
                                    width="50"
                                    height="50" />
                                </td>
                                <td>
                                    <Actions
                                        handleDelete={() => handleDeleteBook(item._id)}
                                        handleEdit={() => handleEditBook(item._id, item.bookName, item.category, item.author, item.avatar)}
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

export default Books;
