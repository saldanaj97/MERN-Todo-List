import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { CredentialsContext } from "../App";

export default function Todos(props) {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => {
        if (!todos) {
          console.log("Nothing in the list yet. ");
          return;
        }
        setTodos(todos.todos);
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = (filter) => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  return (
    <div>
      {/*       <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="uncompleted">Uncompleted</option>
        <option value="completed">Completed</option>
      </select> */}
      {todos &&
        getTodos(props.filter).map((todo) => (
          <div key={todo.id}>
            <input
              class="checkboxes"
              checked={todo.checked}
              onChange={() => toggleTodo(todo.id)}
              id="checkbox1"
              type="checkbox"
            />
            <label>{todo.text}</label>
          </div>
        ))}
      {!todos && (
        <span>
          <div>No tasks in your list yet. </div>
        </span>
      )}
      <br />
      <form onSubmit={addTodo}>
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
        ></input>
        <button
          style={{
            background: "hsl(348, 86%, 43%)",
            color: "white",
            borderRadius: "10px",
            width: "20%",
            fontWeight: "bold",
          }}
          class="button is-small"
        >
          Add
        </button>
      </form>
    </div>
  );
}
