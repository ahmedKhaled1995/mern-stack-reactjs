import axios from "axios";
import {  Row, Col, Table } from 'react-bootstrap';
import { useState, useEffect } from "react";
import '../../style/mybooks.css'

const Mybooks = () => {
    const [usrBooks, setUsrBooks] = useState([]);
    const Auth_token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${Auth_token}` },
        params: {
            shelveStatus: ""
        }
    };
  

    const fetchBooks = (configParams) => {
        axios.get('http://localhost:5000/myBooks', 
        configParams,
        )
        .then(function (response) {
        console.log(response.data);
        setUsrBooks(response.data)
        })
        .catch(err => {
            console.log(err);
        });
      }

      useEffect(() => {
        fetchBooks(config);
      }, []);

      const handleBookState = (stateType) => {
        const header = document.querySelector("#tableHeader");
          if (stateType == "all"){
            config.params.shelveStatus="";
            header.innerHTML = "All Books"
          }
          if (stateType == "read"){
            config.params.shelveStatus="Read";
            header.innerHTML = "Finished Books"
          }
          if (stateType == "currently_reading"){
            config.params.shelveStatus="Currently_Reading";
            header.innerHTML = "Currently Reading Books"
          }
          if (stateType == "want_to_read"){
            config.params.shelveStatus="Want_To_Read";
            header.innerHTML = "Want To Read Books"
          }

          fetchBooks(config)
      }
      
    return (
        <div>
            <Row>
            <Col className="sidenav" sm={2} >
                <a href="#all" onClick={() => { handleBookState("all")}}>All</a>
                <a href="#read" onClick={() => { handleBookState("read") }}>Read</a>
                <a href="#currently_reading" onClick={() => {  handleBookState("currently_reading")}}>Currently Reading</a>
                <a href="#want_to_read" onClick={() => {  handleBookState("want_to_read")}}>Want To Read</a>
            </Col>
            <Col sm={10}>
                <h1 id="tableHeader" className="text-center">
                    All Books
                </h1>
                <Table striped bordered hover size="sm" className="text-center">
                <thead>
                    <tr>
                    <th>Cover</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Avg Rating</th>
                    <th>Rating</th>
                    <th>Shelve</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usrBooks.map((book) => {
                            return <tr key= {book._id}>
                                <td>
                                    cover
                                </td>
                                <td>
                                    {book.book.bookName}
                                </td>
                                <td>
                                    {book.book.author}
                                </td>
                                <td>
                                    Avg Rating
                                </td>
                                <td>
                                    Rating
                                </td>
                                <td>
                                    {book.shelveStatus}
                                </td>

                            </tr>
                        } )
                    }
                </tbody>
                </Table>
            </Col>
            </Row>
        </div>
    )
}

export default Mybooks;
