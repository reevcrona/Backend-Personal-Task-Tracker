import { TaskProps } from "../types";
import { TiDeleteOutline, TiEdit } from "react-icons/ti";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Task = ({
  task,
  deleteTask,
  completeTask,
  setTaskToEdit,
  setIsEditModeActive,
  setIsLightboxOpen,
}: TaskProps) => {
  return (
    <div>
      <h1>{task.title}</h1>
      <h3>{task.category}</h3>
      <h4>{task.description}</h4>
      <button onClick={() => deleteTask(task)}>
        <TiDeleteOutline />
      </button>
      {!task.isCompleted && (
        <button onClick={() => completeTask(task)}>
          <IoIosCheckmarkCircle />
        </button>
      )}
      <button
        onClick={() => {
          setTaskToEdit(task);
          setIsEditModeActive(true);
          setIsLightboxOpen(true);
        }}
      >
        <TiEdit />
      </button>
    </div>
  );
};

export default Task;
