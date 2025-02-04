import { TaskProps } from "../types";
import { TiDeleteOutline, TiEdit } from "react-icons/ti";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CiUndo } from "react-icons/ci";

const Task = ({
  task,
  deleteTask,
  completeTask,
  undoTask,
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
      {!task.isCompleted && (
        <button
          onClick={() => {
            setTaskToEdit(task);
            setIsEditModeActive(true);
            setIsLightboxOpen(true);
          }}
        >
          <TiEdit />
        </button>
      )}
      {task.isCompleted && (
        <button onClick={() => undoTask(task)}>
          <CiUndo />
        </button>
      )}
    </div>
  );
};

export default Task;
