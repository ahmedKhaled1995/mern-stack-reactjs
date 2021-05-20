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

function App() {

  const [token, setToken] = useState('');

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
            <Guard>
              <Route path="/mybooks" component={Mybooks} />
              <Route path="/books" component={Books} />
              <Route path="/logout" render={(props) => <Logout handleLogout={handleLogout} {...props} />} />
            </Guard>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
