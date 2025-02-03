import React from "react";
import { useState } from "react";
import { TaskType } from "./types";
import Task from "./Components/Task";
import TaskInput from "./Components/TaskInput";
import { render } from "react-dom";
const App = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const addTask = (taskItem: TaskType): void => {
    setTaskList((prevState) => [...prevState, taskItem]);
  };
  const renderTasks: JSX.Element[] = taskList.map((item) => (
    <Task
      key={item.id}
      title={item.title}
      id={item.id}
      description={item.description}
    />
  ));
  return (
    <div>
      <TaskInput InputAddTask={addTask} />
      {renderTasks}
    </div>
  );
};

export default App;
