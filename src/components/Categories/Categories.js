import { Card,CardDeck } from 'react-bootstrap';
import { useState, useEffect } from "react";
import loadData from "../../helpers/loadData";
import  './style.css'

const Categories = () => {
    const [categories, setCategories] = useState([]);
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
    return (
        <CardDeck style={{display: 'flex', flexDirection: 'row'}}>
            <Card bg="info" style={{ width: '18rem' ,padding: '10px',flex: 1, margin: '20px'  }} className="mb-2" >
             
                {  
                 categories.map((item, index) => {
                        if (index%2==0)
                        {
                            return (
                            
                             <Card.Text 
                             key={item._id} 
                             style={{ padding: '10px', textAlign : 'center'}}
                             > 
                             <a className="aStyle" href={`category/${item._id}`}>{item.name}</a>
                             </Card.Text>   
                            )
                        }
                    })
                }

            </Card>
            <Card bg="info" style={{ width: '18rem' ,padding: '10px',flex: 1, margin: '20px'  }} className="mb-2" >
             
                {  
                 categories.map((item, index) => {
                        if (index%2!=0)
                        {
                            return (
                            
                             <Card.Text 
                             key={item._id} 
                             style={{ padding: '10px', textAlign : 'center'}}
                             > 
                             <a className="aStyle" href={`category/${item._id}`}>{item.name}</a>
                             </Card.Text>   
                            )
                        }
                    })
                }

         </Card>
            
        </CardDeck>
    )
}

export default Categories
