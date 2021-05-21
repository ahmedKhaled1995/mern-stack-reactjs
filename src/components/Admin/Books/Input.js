import { useState, useEffect } from "react";
import { Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';

import loadData from "../../../helpers/loadData";

import "./input.css";

const Input = (props) => {

    const [bookName, setBookName] = useState('');
    const [category, setCategory] = useState('');
    const [categoryTitle, setCategoryTitle] = useState('Select Category')
    const [author, setAuthor] = useState('');
    const [authorTitle, setAuthorTitle] = useState('Select Author')
    const [fileObj, setFileObj] = useState({});
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        if (props.bookName) setBookName(props.bookName);
        if (props.categoryName) setCategoryTitle(props.categoryName);
        if (props.categoryId) setCategory(props.categoryId);
        if (props.authorName) setAuthorTitle(props.authorName)
        if (props.authorId) setAuthor(props.authorId)

        // Fetching categories availavle
        const fetchCategories = async () => {
            const data = await loadData("http://localhost:5000/categories");
            setCategories(data);
        };
        fetchCategories();


        // Fetching authors available
        const fetchAuthors = async () => {
            const data = await loadData("http://localhost:5000/authors");
            setAuthors(data);
        };
        fetchAuthors();

    }, []);

    const handleCategorySelect = (e) => {
        setCategory(e);
        console.log(e);
    };

    const handleAuthorSelect = (e) => {
        setAuthor(e);
        console.log(e);
    };

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Book name"
                    value={bookName} onChange={(e) => setBookName(e.target.value)} required />
            </Form.Group>

            <div>
                <Form.Label>Category</Form.Label>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={categoryTitle}
                    onClick={(e) => { setCategoryTitle(e.target.textContent) }}
                    onSelect={(e) => { handleCategorySelect(e) }} required>
                    {categories.map((item) => {
                        return <Dropdown.Item eventKey={item._id} key={item._id}>{item.name} </Dropdown.Item>
                    })}
                </DropdownButton>
            </div>

            <div>
                <Form.Label>Author</Form.Label>
                <DropdownButton
                    id="dropdown-basic-button"
                    title={authorTitle}
                    onClick={(e) => { setAuthorTitle(e.target.textContent) }}
                    onSelect={(e) => { handleAuthorSelect(e) }} required>
                    {authors.map((item) => {
                        return <Dropdown.Item eventKey={item._id} key={item._id} >{item.firstName + ", " + item.lastName} </Dropdown.Item>
                    })}
                </DropdownButton>
            </div>

            <div className="form-group mt-2">
                <label className="mb-2">Author Picture</label>
                <input type="file" className="form-control" onChange={(e) => { setFileObj(e.target.files[0]) }} />
            </div>



            <div className="center">
                <Button variant="primary" type="submit" onClick={(e) => props.handleSubmit(e, bookName, category, author, fileObj)}>
                    Submit
            </Button>
            </div>

        </Form>
    )
}

export default Input;
