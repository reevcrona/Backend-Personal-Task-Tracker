import React from "react";
import { useState } from "react";
import { TaskType } from "./types";
import Task from "./Components/Task";
import TaskInput from "./Components/TaskInput";
import Lightbox from "./Components/Lightbox";

const App = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

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
      {renderTasks}
      <Lightbox>
        <TaskInput InputAddTask={addTask} />
      </Lightbox>
    </div>
  );
};

export default App;
