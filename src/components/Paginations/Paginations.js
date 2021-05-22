// import React from "react";
// import {  Pagination } from 'react-bootstrap';


// export default function Paginations({pageCount}) {
//   let active = 1;
//   let items = [];
//   for (let number = 1; number <= pageCount; number++) {
//     items.push(
//       <Pagination.Item key={number} active={number === active} activeLabel="" onClick={() => { console.log(number);   }} > 
//         {number}
//       </Pagination.Item>
//     );
//   }
//   return (
//     <div className="d-flex justify-content-center mt-5">
//       <Pagination>{items}</Pagination>
//       <br />
//     </div>
//   );
// }


import React from 'react'
import { useState } from "react";
import { Table } from 'react-bootstrap';

import '../../style/pagination.css'


export default function Paginations({ data, pageLimit, dataLimit }) {

  // const [pages, setPages] = useState(Math.ceil(data.length / dataLimit));
  
  const [currentPage, setCurrentPage] = useState(1);

  // setPages(Math.ceil(data.length / dataLimit))
  let pages = Math.ceil(data.length / dataLimit);

  
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    // let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    let start = 0;
    let count = pages ;
    
    console.log(count);
    return new Array(count).fill().map((_, idx) => start + idx + 1);
  };
  

  return (
    <div>
      <div>
      <div className="dataContainer">

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
                    getPaginatedData().map((book) => {
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

      </div>

      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 5 page
          numbers at a time
      */}
      <div className="pagination">
        {/* previous button */}
        {/* <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
        >
          prev
        </button> */}

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        {/* <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}
        >
          next
        </button> */}
      </div>
    </div>
        
    </div>
  )
}
