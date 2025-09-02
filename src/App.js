// main component where the Todo app’s UI and logic are connected.
import React, { useState } from "react";
// import bg from "./assets/time.jpg";
import "./App.css";
// import { FaTrash } from "react-icons/fa";
import { useTodos } from "./useTodos";
import TodoFilter from "./TodoFilter";

function App() {
  const {
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
  } = useTodos([
    { id: 1, text: "New Task", completed: true, deadline: "2023-08-04" },
    {
      id: 2,
      text: "Another New Task",
      completed: false,
      deadline: "2023-07-30",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  return (
    <div
      className="App">
      {/* Header */}
      <div className="todo-header">
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className={error.todo ? "error" : ""}
            />
            {error.todo && <span className="error-message">Enter a task</span>}
          </div>

          <div className="input-group">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button type="submit">Add Task</button>
        </form>
      </div>

      {/* Todo List */}
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            <div className="todo-content">
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
              </span>
              <span className="deadline">{getDeadlineText(todo.deadline)}</span>
            </div>

            <span className="delete" onClick={() => deleteTodo(todo.id)} >del</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="todo-footer">
        <span>Items left {todos.filter((t) => !t.completed).length}</span>
        <TodoFilter currentFilter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default App;
