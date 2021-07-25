import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("Completed", "Uncompleted");

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
    const newTodo = { checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo._id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <select onChange={(e) => changeFilter(e.target.value)}>
        <option value="uncompleted">Uncompleted</option>
        <option value="completed">Completed</option>
      </select>
      {todos &&
        getTodos().map((todo) => (
          <div key={todo._id}>
            <input
              checked={todo.checked}
              onChange={() => toggleTodo(todo._id)}
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
        <button>Add</button>
      </form>
    </div>
  );
}