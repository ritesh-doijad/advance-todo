import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";

import {
  selectTasksByPriority,
  toggleCompletion,
  toggleImportance,
} from "../store/tasksSlice";
import { fetchWeather } from "../store/weatherSlice";

const outdoorKeywords = [
  "run",
  "walk",
  "cycle",
  "bike",
  "football",
  "hike",
  "swim",
];

const TaskList = () => {
  const dispatch = useDispatch();
  const activeView = useSelector((state) => state.tasks.activeView);
  const tasks = useSelector((state) =>
    selectTasksByPriority(state, activeView)
  );

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const weather = useSelector((state) => state.weather.data);

  useEffect(() => {
    dispatch(fetchWeather("Nagpur"));
  }, [dispatch]);

  const isOutdoorTask = (task) => {
    return outdoorKeywords.some((keyword) =>
      task.text.toLowerCase().includes(keyword)
    );
  };

  return (
    <div className="relative flex">
      <div className="flex-1">
        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Pending Tasks (With Weather for Outdoor Tasks)
            </h2>
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isOutdoorTask={isOutdoorTask(task)}
                weather={weather}
                toggleTaskCompletion={() => dispatch(toggleCompletion(task.id))}
                toggleTaskImportance={() => dispatch(toggleImportance(task.id))}
              />
            ))}
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Completed Tasks
            </h2>
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTaskCompletion={() => dispatch(toggleCompletion(task.id))}
                toggleTaskImportance={() => dispatch(toggleImportance(task.id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
