// src/App.jsx
import React from "react";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Todo List (CRUD)</h1>
      <TodoList />
    </div>
  );
}