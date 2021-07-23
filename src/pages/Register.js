import React, { useState } from "react";

const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json;
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/register`, {
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
      .then(() => {})
      .catch((error) => {
        console.log("here", error);
        setError(error.message);
      });
  };
  return (
    <div>
      <h1>Registration</h1>
      {error && (
        <span style={{ color: "red" }}>
          {error}
          <br />
          <br />
        </span>
      )}
      <form onSubmit={register}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <br />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
