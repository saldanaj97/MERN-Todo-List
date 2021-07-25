import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import "./App.css";

export const CredentialsContext = React.createContext(null);

function App() {
  const credentialsState = useState({ username: "john", password: "1234" });

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
