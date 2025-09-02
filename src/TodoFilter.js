// small component for filtering (All, Active, Completed).
import React from "react";

function TodoFilter({ currentFilter, setFilter }) {
  return (
    <div className="filters">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={currentFilter === "active" ? "active" : ""}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
