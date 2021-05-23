import React from 'react'
import { Card,CardDeck } from 'react-bootstrap';
import { useState, useEffect } from "react";
import loadData from "../../helpers/loadData";

export const Categorybooks = ({id}) => {

    const [books, setbooks] = useState([]);
    const [error, setError] = useState(false);
  

    useEffect(() => {
        const fetchData = async () => {
     
            const data = await loadData(`http://localhost:5000/books?skip=0&limit=0&sortBy=createdAt:asc&category=${id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            console.log(data);
            if (data.error) {
                setError(true);
            } else {
                setbooks(data);
            }
        };
        fetchData();
    }, []);

    
  

    return (
        <div>
            hello from category books
            {books.map((item,index) =>{
                return (
                    <tr key={item._id}>
                    <td>{item.author.firstName } </td> 
                    <td> ====</td>
                    <td>{item.bookName}</td>
                  <img src={`http://localhost:5000/books/${item._id}/avatar`}></img>
                    </tr>

                )
                    
            })
        }
        </div>
    )
}
