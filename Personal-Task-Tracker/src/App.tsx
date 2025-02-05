import { useState, useEffect } from "react";
import { TaskType } from "./types";
import Task from "./Components/Task";
import TaskInput from "./Components/TaskInput";
import Lightbox from "./Components/Lightbox";
import { FaPlus } from "react-icons/fa6";

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
  }, [taskList]);
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
      prevState.filter((item) => item.id !== taskItem.id),
    );
    setTaskIndexTracker(
      taskList.length + completedTaskList.length - 1 < 0
        ? 0
        : taskList.length + completedTaskList.length - 1,
    );
  };
  const editTask = (
    taskItem: TaskType,
    titleInput: string,
    descInput: string,
    categoryInput: string,
    e: React.FormEvent<HTMLFormElement>,
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
          : item,
      ),
    );
    setIsLightboxOpen(false);
    setIsEditModeActive(false);
  };
  const undoTask = (taskItem: TaskType): void => {
    deleteTask(taskItem);
    const updatedTask: TaskType = {
      ...taskItem,
      isCompleted: !taskItem.isCompleted,
    };
    setTaskList((prevState) => {
      const updatedTaskList = [...prevState];
      updatedTaskList.push(updatedTask);
      return updatedTaskList.sort((a, b) => a.index - b.index);
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
      if (!prevTask || currentTask.index - 1 !== prevTask.index) {
        listToUpdate((prevState) =>
          prevState.map((item) =>
            item.id === currentTask.id ? { ...item, index: i } : item,
          ),
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-900">
      <div>
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="flex items-center justify-center"
        >
          <h1 className="mr-2 text-white hover:cursor-pointer">
            Click here to add a task
          </h1>
          <button className="border-2 border-white p-1 text-white hover:border-green-600 hover:text-green-600">
            <FaPlus />
          </button>
        </div>
        {isLightboxOpen && (
          <Lightbox>
            <TaskInput
              InputAddTask={addTask}
              isEditModeActive={isEditModeActive}
              taskToEdit={taskToEdit}
              editTask={editTask}
              taskIndexTracker={taskIndexTracker}
              setTaskIndexTracker={setTaskIndexTracker}
              setIsLightboxOpen={setIsLightboxOpen}
            />
          </Lightbox>
        )}
      </div>

      <div className="flex w-full flex-row items-center justify-center gap-7">
        <div className="flex min-h-60 w-full max-w-lg flex-col gap-3">
          <h1 className="text-center text-white">Current tasks</h1>
          {renderTasks(taskList)}
        </div>
        <div className="flex min-h-60 w-full max-w-96 flex-col gap-3">
          <h1 className="text-center text-white">Completed tasks</h1>
          {renderTasks(completedTaskList)}
        </div>
      </div>
    </div>
  );
};

export default App;
