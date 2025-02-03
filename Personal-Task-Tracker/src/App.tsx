import React from "react";
import { useState } from "react";
import { TaskType } from "./types";
import Task from "./Components/Task";
import TaskInput from "./Components/TaskInput";
const App = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const addTask = (taskItem: TaskType) => {
    setTaskList((prevState) => [...prevState, taskItem]);
  };

  return (
    <div>
      <TaskInput />
    </div>
  );
};

export default App;
