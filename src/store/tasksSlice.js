import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    { id: "1", text: "Go for a run", completed: false, important: false, priority: "high" },
    { id: "2", text: "Read a book", completed: true, important: false, priority: "medium" },
    { id: "3", text: "Clean the house", completed: false, important: false, priority: "low" },
    { id: "4", text: "Hike in the mountains", completed: true, important: false, priority: "medium" },
    { id: "5", text: "Play football", completed: true, important: false, priority: "high" },
    { id: "6", text: "Walk the dog", completed: false, important: false, priority: "low" },
  ],
  activeView: "All Tasks",
  searchQuery: "", // 🔍 New state for search input
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now().toString(),
        text: action.payload.text,
        priority: action.payload.priority || "medium",
        completed: false,
        important: false,
      });
    },
    toggleCompletion: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    toggleImportance: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.important = !task.important;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setActiveView: (state, action) => {
      state.activeView = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Update search input
    },
  },
});

// Selectors
export const selectTasks = (state) => state.tasks.tasks;

export const selectTasksByPriority = (state, priority) => {
  let filteredTasks = state.tasks.tasks;

  // Filter by priority
  if (priority !== "All Tasks") {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority.toLowerCase() === priority.toLowerCase()
    );
  }

  // Filter by search query
  if (state.tasks.searchQuery.trim() !== "") {
    filteredTasks = filteredTasks.filter((task) =>
      task.text.toLowerCase().includes(state.tasks.searchQuery.toLowerCase())
    );
  }

  return filteredTasks;
};

export const { addTask, toggleCompletion, deleteTask, toggleImportance, setActiveView, setSearchQuery } = tasksSlice.actions;

export default tasksSlice.reducer;
