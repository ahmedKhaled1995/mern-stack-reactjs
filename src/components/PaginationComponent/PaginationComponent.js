import React, { useEffect, useState } from "react";
import "./style.css";
import loadData from "../../helpers/loadData";
import { Pagination,CardDeck,Card} from 'react-bootstrap';

const renderData = (data) => {
  console.log(data);

  // return (
  //   <ul>
  //     {data.map((todo, index) => {
  //       return <li key={index}>{todo.bookName}</li>;
  //     })}
     
  //   </ul>
  // );
  return (

    <>
    {data.map((item,index) =>{
        if (index===0){
           return( <h1>{item.category.name}</h1>)
           
        }
    }
    
    )}
    <CardDeck style={{display: 'flex', flexDirection: 'row'}} >

      {data.map((item,index) =>{
            
         
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
};

export const PaginationComponent= ({props})=> {
  const [data, setData] = useState([]);

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

 

  useEffect(() => {
    const fetchData = async () => {
 
        const data = await loadData(`http://localhost:5000/books?category=60a84ad1df3bf8c9c300355f`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        console.log("sizeeeeeeeee=",data.lengnth);
       
          setData(data);
        
    };
    fetchData();
}, []);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  return (
    <>
      <h1>Todo List</h1> <br />
      {renderData(data)}
      {/* <h2> ss{props}</h2> */}
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
      <button onClick={handleLoadMore} className="loadmore">
        Load More
      </button>
    </>
  );
}

export default PaginationComponent;