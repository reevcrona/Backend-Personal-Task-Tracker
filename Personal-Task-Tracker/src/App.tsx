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
    setIsLightboxOpen(false);
  };
  const deleteTask = (taskItem: TaskType): void => {
    setTaskList((prevState) =>
      prevState.filter((task) => task.id !== taskItem.id)
    );
  };
  const renderTasks: JSX.Element[] = taskList.map((item) => (
    <Task task={item} key={item.id} deleteTask={deleteTask} />
  ));
  return (
    <div>
      {renderTasks}
      <div onClick={() => setIsLightboxOpen(true)}>
        <h1>Click here</h1>
        {isLightboxOpen && (
          <Lightbox>
            <TaskInput InputAddTask={addTask} />
          </Lightbox>
        )}
      </div>
    </div>
  );
};

export default App;
