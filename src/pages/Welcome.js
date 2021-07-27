import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CredentialsContext } from "../App";
import Todos from "../components/Todos";

export default function Welcome() {
  const [credentials, setCredentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("Completed", "Uncompleted");

  const Logout = () => {
    setCredentials(null);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
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
                    <button class="logout-button" onClick={Logout}>
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {!credentials && (
        <div class="hero-body">
          <div class="container has-text-centered">
            <p class="title">
              <h1 class="title is-2 ">Welcome</h1>
            </p>
            <Link to="/register">Register</Link>
            <br />
            <br />
            <Link to="/login">Login</Link>
          </div>
        </div>
      )}

      {credentials && (
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
                <div class="card" style={{ borderRadius: "4px" }}>
                  <div class="card-content">
                    {credentials && <Todos filter={filter} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {credentials && (
        <div class="hero-foot">
          <nav class="tabs is-fullwidth is-boxedis-centered">
            <div class="container">
              <ul>
                <li>
                  <button
                    type="button"
                    class="filter-buttons"
                    onClick={() => {
                      changeFilter("uncompleted");
                    }}
                  >
                    Uncompleted
                  </button>
                </li>
                <li>
                  <button
                    class="filter-buttons"
                    onClick={() => {
                      changeFilter("completed");
                    }}
                  >
                    Completed
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )}
    </section>
  );
}

/*       <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="uncompleted">Uncompleted</option>
        <option value="completed">Completed</option>
      </select> */
