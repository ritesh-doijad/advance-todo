import React from "react";
import { Star } from "lucide-react";

function TaskItem({ task, isOutdoorTask, weather, toggleTaskCompletion, toggleTaskImportance }) {

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100">
      
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
          }}
          className="h-5 w-5 rounded border-gray-300"
        />
        <span className={`text-lg ${task.completed ? "line-through text-gray-500" : "text-black"}`}>
          {task.text}
        </span>
      </div>
      
      
      {isOutdoorTask && weather && (
        <div className="flex-1 text-center text-md text-gray-600">
          🌤 {weather.weather[0].description} - {weather.main.temp}°C
        </div>
      )}
      
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleTaskImportance(task.id);
        }}
        className={`p-1 rounded-full ${task.important ? "text-yellow-500" : "text-gray-400"}`}
      >
        <Star className="h-5 w-5" fill={task.important ? "currentColor" : "none"} />
      </button>
    </div>
  );
}

export default TaskItem;
