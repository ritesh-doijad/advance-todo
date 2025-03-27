import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveView } from '../store/tasksSlice';
import { logout } from '../store/authSlice';
import { User, Home, AlertCircle, Star, ChevronLeft, LogOut } from 'lucide-react';

export default function Sidebar({ expanded, setExpanded, taskCount, completedTaskCount }) {
  const dispatch = useDispatch();
  const activeView = useSelector((state) => state.tasks.activeView);

  const progress = taskCount > 0 ? (completedTaskCount / taskCount) * 100 : 0;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className={`h-screen sticky top-0 flex-shrink-0 bg-white transition-all duration-300 ${
      expanded ? "w-64" : "w-20"
    }`}>
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b">
          {expanded && (
            <h1 className="text-xl font-bold ">
              Advanced Todo
            </h1>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft
              className={`h-5 w-5 transition-transform ${expanded ? "" : "rotate-180"}`}
            />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          {expanded && <p className="font-medium truncate">Hey, Ritesh</p>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <button
            className={`flex items-center space-x-3 w-full p-2 rounded-md transition-colors ${
              activeView === "All Tasks"
                ? "bg-indigo-50 text-indigo-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => dispatch(setActiveView("All Tasks"))}
          >
            <Home className="h-5 w-5" />
            {expanded && <span>All Tasks</span>}
          </button>

          <button
            className={`flex items-center space-x-3 w-full p-2 rounded-md transition-colors ${
              activeView === "high"
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => dispatch(setActiveView("high"))}
          >
            <AlertCircle className="h-5 w-5" />
            {expanded && <span>High Priority</span>}
          </button>

          <button
            className={`flex items-center space-x-3 w-full p-2 rounded-md transition-colors ${
              activeView === "Medium Priority"
                ? "bg-amber-50 text-amber-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => dispatch(setActiveView("medium"))}
          >
            <AlertCircle className="h-5 w-5" />
            {expanded && <span>Medium Priority</span>}
          </button>

          <button
            className={`flex items-center space-x-3 w-full p-2 rounded-md transition-colors ${
              activeView === "Low Priority"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={() => dispatch(setActiveView("low"))}
          >
            <Star className="h-5 w-5" />
            {expanded && <span>Low Priority</span>}
          </button>
        </nav>

        {/* Task Progress */}
        <div className="p-4 border-t bg-gray-50 mx-2">
          <div className="flex justify-between items-center">
            {expanded && (
              <div>
                <h3 className="text-sm text-gray-600">Tasks Completed</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {completedTaskCount} / {taskCount}
                </p>
              </div>
            )}
            {/* Progress Circle */}
            <div className="h-14 w-14 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.2"
                  strokeWidth="4"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={`${progress} 100`}
                  strokeDashoffset="25"
                  transform="rotate(-90 18 18)"
                  className="text-indigo-600"
                ></circle>
              </svg>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 p-2 border border-red-300 rounded-md text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            {expanded && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
