import { TaskProps } from "../types";
import { TiDeleteOutline } from "react-icons/ti";
const Task = ({ task, deleteTask }: TaskProps) => {
  return (
    <div>
      <h1>{task.title}</h1>
      <h3>{task.category}</h3>
      <h4>{task.description}</h4>
      <button onClick={() => deleteTask(task)}>
        <TiDeleteOutline />
      </button>
    </div>
  );
};

export default Task;
