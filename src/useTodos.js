// custom hook that manages the state and logic of todos.
import { useState } from "react";

export function useTodos(initialTodos = []) {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState({ todo: false, date: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    let todoError = newTodo.trim() === "";

    if (todoError) {
      setError({ todo: true, date: false });
      return;
    }

    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false, deadline: date },
    ]);
    setNewTodo("");
    setDate("");
    setError({ todo: false, date: false });
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getDeadlineText = (deadline) => {
    //if no deadline
    if (!deadline) return "No deadline";

    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.floor((now - due) / (1000 * 60 * 60 * 24));
    return diff >= 0
      ? `Deadline Expired ${diff} days ago`
      : `Deadline in ${Math.abs(diff)} days`;
  };

  return {
    todos,
    newTodo,
    setNewTodo,
    date,
    setDate,
    error,
    handleSubmit,
    toggleComplete,
    deleteTodo,
    getDeadlineText,
  };
}
