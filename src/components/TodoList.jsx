// src/components/TodoList.jsx
import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../api/todoApi";

export default function TodoList() {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setNewTask("");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setEditId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading todos.</p>;

  return (
    <div>
      <input
        type="text"
        value={newTask}
        placeholder="Add new task"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        onClick={() => {
          if (newTask.trim()) {
            addMutation.mutate({ title: newTask });
          }
        }}
      >
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            {editId === todo.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button
                  onClick={() =>
                    updateMutation.mutate({
                      id: todo.id,
                      updatedTodo: { title: editValue },
                    })
                  }
                >
                  Save
                </button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>{" "}
                <button
                  onClick={() => {
                    setEditId(todo.id);
                    setEditValue(todo.title);
                  }}
                >
                  Edit
                </button>{" "}
                <button onClick={() => deleteMutation.mutate(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
