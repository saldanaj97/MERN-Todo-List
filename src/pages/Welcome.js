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
    <section class="hero is-success is-fullheight has-background-danger-dark">
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <div class="navbar-item">
                <h1 class="title is-1">Todo Tracker</h1>
              </div>
            </div>
            <div id="navbarMenuHeroC" class="navbar-menu">
              <div class="navbar-end">
                <div class="navbar-item">
                  {credentials && (
                    <button
                      class="button is-primary is-inverted is-outlined is-danger is-medium"
                      onClick={Logout}
                    >
                      Logout
                    </button>
                  )}
                  {!credentials && <Link to="/register">Register</Link>}
                  {!credentials && <Link to="/login">Login</Link>}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            <h1 class="title is-2 ">
              Welcome {credentials && credentials.username}
            </h1>
          </p>
          <p class="subtitle">Here's your task list for today. </p>
          <div class="columns is-mobile is-centered">
            <div class="column is-5">
              <div class="card" style={{ borderRadius: "20px" }}>
                <div class="card-content">{credentials && <Todos />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-foot">
        <nav class="tabs is-fullwidth is-boxedis-centered">
          <div class="container">
            <ul>
              <li>
                <button class="button is-active is-primary is-inverted is-danger is-medium">
                  Uncompleted
                </button>
              </li>
              <li>
                <button class="button is-active is-primary is-inverted is-danger is-medium">
                  Completed
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
    /*     <div>
      <h1>Welcome {credentials && credentials.username}</h1>
      {!credentials && <Link to="/register">Register</Link>}
      <br />
      <br />
      {!credentials && <Link to="/login">Login</Link>}
      {credentials && <Todos />}
      {credentials && <button onClick={Logout}>Logout</button>}
    </div> */
  );
}
