import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

import loadData from "../../../helpers/loadData";
import Actions from "../Utils/Actions";
import CustomModal from "../Utils/CustomModal";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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

    const handleDeleteCategory = (_id) => {
        console.log(_id);
    };

    const handleEditCategory = (_id) => {
        console.log(_id);
    };

    return (
        <>
            <CustomModal />
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
                                        handleEdit={() => handleEditCategory(item._id)}
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
