import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasksSlice";

function TaskForm() {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium"); // Default priority

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    dispatch(addTask({ text: taskText, priority })); // Send task with priority
    setTaskText(""); // Clear input after adding task
    setPriority("medium"); // Reset priority
  };

  return (
    <form onSubmit={handleAddTask} className="mb-6 bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Add a task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Priority Buttons */}
        <button
          type="button"
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            priority === "high"
              ? "bg-black text-white"
              : "border outline"
          }`}
          onClick={() => setPriority("high")}
        >
          High
        </button>
        <button
          type="button"
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            priority === "medium"
              ? "bg-black text-white"
              : "border outline"
          }`}
          onClick={() => setPriority("medium")}
        >
          Medium
        </button>
        <button
          type="button"
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            priority === "low"
              ? "bg-black text-white"
              : "border outline"
          }`}
          onClick={() => setPriority("low")}
        >
          Low
        </button>

        <button type="submit" className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
