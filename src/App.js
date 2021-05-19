import { useState } from "react";
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import Navigation from "./components/Nav/Navigation";
import Guard from "./components/Guard/Guard";
import Home from "./components/Home/Home";
import Logout from "./components/Auth/Logout";
import Books from "./components/Books/Books";

import './App.css';
import AdminMain from "./components/Admin/AdminMain";

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
        <Container>
          <Switch>
            <Route path="/" render={(props) => <Home handleAuth={handleAuth} {...props} />} exact />
            <Route path="/admin" component={AdminMain} />
            <Guard>
              <Route path="/books" component={Books} />
              <Route path="/logout" render={(props) => <Logout handleLogout={handleLogout} {...props} />} />

            </Guard>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
