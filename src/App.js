import { useState } from "react";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Navigation from "./components/Nav/Navigation";
import Guard from "./components/Guard/Guard";
import Home from "./components/Home/Home";
import Logout from "./components/Auth/Logout";
import Books from "./components/Books/Books";
import Mybooks from "./components/Mybooks/Mybooks";

import './App.css';
import AdminMain from "./components/Admin/AdminMain";
import Categories from "./components/Categories/Categories";
import { Categorybooks } from "./components/Categorybooks/Categorybooks";
import PaginationComponent from "./components/PaginationComponent/PaginationComponent";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleAuth = (token) => {
    console.log("Logged in");
    setToken(token);
  };

  const handleLogout = () => {
    console.log("Logged out");
    setToken("");
  };

  return (
    <Router>
      <div className="App">
        <Navigation token={token} />
        <div className="container-fluid">
          <Switch>
            <Route path="/" render={(props) => <Home handleAuth={handleAuth} {...props} />} exact />
            <Route path="/admin" component={AdminMain} />
            <Guard>
              <Route path="/mybooks" component={Mybooks} />
              <Route path="/books" component={Books} />
              {/* <Route path="/pagenation" component={PaginationComponent} /> */}
              <Route path="/pagenation" render={(props) => <PaginationComponent {...props} />}   />
              <Route path="/categories" component={Categories} />
              <Route path="/category/:id"  render={(props) => (
                  <Categorybooks id={props.match.params.id}/>)}  />
              <Route path="/logout" render={(props) => <Logout handleLogout={handleLogout} {...props} />} />
           
            </Guard>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
