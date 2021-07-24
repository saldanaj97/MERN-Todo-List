import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json;
};

export default function Login() {
  const [username, getUsername] = useState("");
  const [password, getPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({ username, password });
        history.push("/");
      })
      .catch((error) => {
        console.log("here", error);
        setError(error.message);
      });
  };

  const history = useHistory();

  return (
    <div>
      <h1>Login</h1>
      {error && (
        <span style={{ color: "red" }}>
          {error}
          <br />
          <br />
        </span>
      )}
      <form onSubmit={login}>
        <input
          onChange={(e) => getUsername(e.target.value)}
          placeholder="Username"
        />
        <br />
        <br />
        <input
          onChange={(e) => getPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <br />
        <br />
        <button onSubmit="submit">Login</button>
      </form>
    </div>
  );
}
