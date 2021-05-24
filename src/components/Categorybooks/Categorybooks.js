import React from 'react'
import { Pagination,CardDeck,Card} from 'react-bootstrap';
import { useState, useEffect } from "react";
import loadData from "../../helpers/loadData";
import PaginationComponent from '../PaginationComponent/PaginationComponent';

export const Categorybooks = ({id}) => {

    const [books, setbooks] = useState([]);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
     
            const data = await loadData(`http://localhost:5000/books?category=${id}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            console.log("sizeeeeeeeee=",data.lengnth);
            if (data.error) {
                setError(true);
            } else {
                setbooks(data);
            }
        };
        fetchData();
    }, []);

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
      <br />
  
      
    </div>
  );

// render(paginationBasic);
  

    return (

    <>
    {books.map((item,index) =>{
        if (index===0){
           return( <h1>{item.category.name}</h1>)
           
        }
    }
    
    )}
    <CardDeck style={{display: 'flex', flexDirection: 'row'}} >

      {books.map((item,index) =>{
            
         
        return (
            <>
            <Card style={{ width: '18rem',padding: '10px',flex:1, margin: '20px' }}   >
            <Card.Img variant="top" src={`http://localhost:5000/books/${item._id}/avatar`} />
            
              <Card.Text>
              <p>Book Name: <a href="#"> {item.bookName}</a></p>
              
              </Card.Text>
              <Card.Text>
              <p>Auther Name: <a href="#"> {item.author.firstName}</a></p>
              </Card.Text>
            
            </Card>
            {/* <PaginationComponent name={name}/> */}
            </>
        )
                
        })
        }
    </CardDeck>
    </>
    )
}
