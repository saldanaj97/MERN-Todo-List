import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import Todos from "../components/Todos";

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const Logout = () => {
    setCredentials(null);
  };
  return (
    <div>
      {credentials && <button onClick={Logout}>Logout</button>}
      <h1>Welcome {credentials && credentials.username}</h1>
      {!credentials && <Link to="/register">Register</Link>}
      <br />
      <br />
      {!credentials && <Link to="/login">Login</Link>}
      {credentials && <Todos />}
    </div>
  );
}
