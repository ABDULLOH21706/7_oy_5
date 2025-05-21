// src/api/todoApi.js
import axios from "axios";

const API_URL = "https://682d95574fae18894756a72a.mockapi.io/name";

export const fetchTodos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTodo = async (todo) => {
  const res = await axios.post(API_URL, todo);
  return res.data;
};

export const updateTodo = async ({ id, updatedTodo }) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return res.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};