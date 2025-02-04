import { useState, useEffect } from "react";
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
  const [taskIndexTracker, setTaskIndexTracker] = useState<number>(0);
  const addTask = (taskItem: TaskType): void => {
    setTaskList((prevState) => [...prevState, taskItem]);
    setIsLightboxOpen(false);
  };
  useEffect(() => {
    checkAvailableIndex();

    console.log(taskList);
    console.log(completedTaskList);
    console.log(taskIndexTracker);
  }, [taskList, taskIndexTracker]);
  const completeTask = (taskItem: TaskType): void => {
    deleteTask(taskItem, false);
    const updatedTask: TaskType = {
      ...taskItem,
      isCompleted: !taskItem.isCompleted,
    };
    setCompletedTaskList((prevState) => [...prevState, updatedTask]);
  };
  const deleteTask = (taskItem: TaskType, inUndoFunc: boolean): void => {
    const listToUpdate = taskItem.isCompleted
      ? setCompletedTaskList
      : setTaskList;

    listToUpdate((prevState) =>
      prevState.filter((item) => item.id !== taskItem.id)
    );
    setTaskIndexTracker(
      taskList.length + completedTaskList.length - 1 < 0
        ? 0
        : taskList.length + completedTaskList.length - 1
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
          : item
      )
    );
    setIsLightboxOpen(false);
    setIsEditModeActive(false);
  };
  const undoTask = (taskItem: TaskType): void => {
    deleteTask(taskItem, true);
    const updatedTask: TaskType = {
      ...taskItem,
      isCompleted: !taskItem.isCompleted,
    };
    setTaskList((prevState) => {
      const updatedTaskList = [...prevState];
      updatedTaskList.splice(updatedTask.index, 0, updatedTask);
      return updatedTaskList;
    });
  };

  const checkAvailableIndex = () => {
    let mergedArray = [...taskList, ...completedTaskList];

    mergedArray.sort((a, b) => a.index - b.index);
    for (let i = 0; i < mergedArray.length; i++) {
      const currentTask = mergedArray[i];
      const prevTask = mergedArray[i - 1];
      const listToUpdate = currentTask.isCompleted
        ? setCompletedTaskList
        : setTaskList;

      if (currentTask.index === 0) {
        console.log(currentTask.id);
        continue;
      }
      if (!prevTask) {
        listToUpdate((prevState) =>
          prevState.map((item) =>
            item.id === currentTask.id ? { ...item, index: i } : item
          )
        );
      } else if (currentTask.index - 1 !== prevTask.index) {
        console.log(currentTask.id);
        listToUpdate((prevState) =>
          prevState.map((item) =>
            item.id === currentTask.id ? { ...item, index: i } : item
          )
        );
      }
    }
  };

  const renderTasks = (taskList: TaskType[]): JSX.Element[] => {
    return taskList.map((taskItem) => (
      <Task
        key={taskItem.id}
        task={taskItem}
        deleteTask={deleteTask}
        completeTask={completeTask}
        undoTask={undoTask}
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
              taskIndexTracker={taskIndexTracker}
              setTaskIndexTracker={setTaskIndexTracker}
            />
          </Lightbox>
        )}
      </div>
    </div>
  );
};

export default App;
