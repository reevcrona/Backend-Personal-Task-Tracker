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
    <div className="min-h-16 w-full border-2 border-white px-3 py-3 transition-all duration-500 ease-in-out hover:translate-x-2 hover:bg-black">
      <div className="flex items-center justify-between border-b-2 pb-2">
        <h1 className="flex flex-col text-2xl text-white">{task.title}</h1>
        <h3 className="text-xl text-white">
          Category:
          <span className="ml-2">{task.category}</span>
        </h3>
      </div>
      <div className="flex justify-between pt-2">
        <h4 className="w-full max-w-48 break-all text-xl text-white">
          {task.description}
        </h4>
        <div className="flex items-center justify-center">
          <button
            title="Delete Task"
            className="mr-2 border-2 border-white p-0.5 text-2xl text-white hover:border-red-600 hover:text-red-600"
            onClick={() => deleteTask(task)}
          >
            <TiDeleteOutline />
          </button>
          {!task.isCompleted && (
            <button
              title="Complete Task"
              className="mr-2 border-2 border-white p-0.5 text-2xl text-white hover:border-green-400 hover:text-green-400"
              onClick={() => completeTask(task)}
            >
              <IoIosCheckmarkCircle />
            </button>
          )}
          {!task.isCompleted && (
            <button
              title="Edit Task"
              className="border-2 border-white p-0.5 text-2xl text-white hover:border-blue-600 hover:text-blue-600"
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
            <button
              title="Undo Task"
              className="mr-2 border-2 border-white p-0.5 text-2xl text-white hover:border-orange-500 hover:text-orange-500"
              onClick={() => undoTask(task)}
            >
              <CiUndo />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
