import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';

import loadData from "../../../helpers/loadData";
import Actions from "../Utils/Actions";
import CustomModal from "../Utils/CustomModal";
import Input from "./Input";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState({ _id: "", name: "" });

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData("http://localhost:5000/categories");
            console.log(data);
            if (data.error) {
                setError(true);
            } else {
                setCategories(data);
            }
        };
        fetchData();
    }, []);

    const handleCloseModal = () => {
        setItemToEdit({ _id: "", name: "" });
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleDeleteCategory = async (_id) => {
        await axios.delete(
            `http://localhost:5000/categories/${_id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        let categoriesCopy = [...categories];
        categoriesCopy = categoriesCopy.filter((item) => {
            return (item._id !== _id)
        });
        setCategories(categoriesCopy);
    };

    const handleEditCategory = (_id, name) => {
        setItemToEdit({ _id, name });
        handleShowModal();
    };

    const handleSubmit = async (e, name) => {
        e.preventDefault();
        if (itemToEdit._id) {  // Patch
            const data = await axios.patch(
                `http://localhost:5000/categories/${itemToEdit._id}`,
                { name },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            const dataObj = data.data;
            const categoriesCopy = [...categories];
            categoriesCopy.forEach((item) => {
                if (item._id === dataObj._id) {
                    item.name = dataObj.name;
                }
            });
            setCategories(categoriesCopy);
        } else {  // Post
            const data = await axios.post(
                "http://localhost:5000/categories",
                { name },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            const dataObj = data.data.category;
            // console.log(dataObj);
            setCategories([...categories, dataObj]);
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
                <Input name={itemToEdit.name} handleSubmit={handleSubmit} />
            </CustomModal>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Actions
                                        handleDelete={() => handleDeleteCategory(item._id)}
                                        handleEdit={() => handleEditCategory(item._id, item.name)}
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

export default Categories;
