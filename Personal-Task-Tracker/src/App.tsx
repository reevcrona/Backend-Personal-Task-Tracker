import { useState } from "react";
import { TaskType } from "./types";
import Task from "./Components/Task";
import TaskInput from "./Components/TaskInput";
import Lightbox from "./Components/Lightbox";

const App = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<TaskType[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const addTask = (taskItem: TaskType): void => {
    setTaskList((prevState) => [...prevState, taskItem]);
    setIsLightboxOpen(false);
  };
  const completeTask = (taskItem: TaskType): void => {
    deleteTask(taskItem);
    const updatedTask: TaskType = {
      ...taskItem,
      isCompleted: !taskItem.isCompleted,
    };
    setCompletedTaskList((prevState) => [...prevState, updatedTask]);
  };
  const deleteTask = (taskItem: TaskType): void => {
    const listToUpdate = taskItem.isCompleted
      ? setCompletedTaskList
      : setTaskList;

    listToUpdate((prevState) =>
      prevState.filter((item) => item.id !== taskItem.id)
    );
  };
  const renderTasks = (taskList: TaskType[]): JSX.Element[] => {
    return taskList.map((taskItem) => (
      <Task
        key={taskItem.id}
        task={taskItem}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    ));
  };
  return (
    <div>
      <div>
        <h1>Current tasks</h1>
        {renderTasks(taskList)}
      </div>
      <div>
        <h1>Completed tasks</h1>
        {renderTasks(completedTaskList)}
      </div>
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
