import { useState } from "react";
import { TaskType } from "./types";
import Task from "./Components/Task";
import TaskInput from "./Components/TaskInput";
import Lightbox from "./Components/Lightbox";

const App = () => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [completedTaskList, setCompletedTaskList] = useState<TaskType[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskType | null>(null);
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
  const editTask = (
    taskItem: TaskType,
    titleInput: string,
    descInput: string,
    categoryInput: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setTaskList((prevState) =>
      prevState.map((item) =>
        item.id === taskItem.id
          ? {
              ...item,
              title: titleInput,
              description: descInput,
              category: categoryInput,
            }
          : taskItem
      )
    );
    setIsLightboxOpen(false);
    setIsEditModeActive(false);
  };

  const renderTasks = (taskList: TaskType[]): JSX.Element[] => {
    return taskList.map((taskItem) => (
      <Task
        key={taskItem.id}
        task={taskItem}
        deleteTask={deleteTask}
        completeTask={completeTask}
        setIsEditModeActive={setIsEditModeActive}
        setIsLightboxOpen={setIsLightboxOpen}
        setTaskToEdit={setTaskToEdit}
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
        <h1 className="lightbox-trigger">Click here to add task</h1>
        {isLightboxOpen && (
          <Lightbox>
            <TaskInput
              InputAddTask={addTask}
              isEditModeActive={isEditModeActive}
              taskToEdit={taskToEdit}
              editTask={editTask}
            />
          </Lightbox>
        )}
      </div>
    </div>
  );
};

export default App;
