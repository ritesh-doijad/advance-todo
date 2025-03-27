import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullList from "../components/FullList";
import Sidebar from "../components/Sidebar";
import { selectTasksByPriority, setActiveView } from "../store/tasksSlice";
import Header from "../components/Header";

const DashBoard = () => {
  const activeView = useSelector((state) => state.tasks.activeView);
  const [expanded, setExpanded] = useState(true);
  const tasks = useSelector((state) =>
    selectTasksByPriority(state, activeView)
  );
  const taskCount = tasks.length;
  const completedTaskCount = tasks.filter((task) => task.completed).length;
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="hidden md:flex p-3 border-r h-screen">
        <Sidebar
          expanded={expanded}
          setExpanded={setExpanded}
          taskCount={taskCount}
          completedTaskCount={completedTaskCount}
        />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-grow p-3 h-full flex flex-col">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <Header />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4">
          <FullList />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
