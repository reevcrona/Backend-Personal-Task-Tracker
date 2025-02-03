import { TaskProps } from "../types";
import { TiDeleteOutline } from "react-icons/ti";
const Task = ({ title, description, category }: TaskProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{category}</h3>
      <h4>{description}</h4>
      <TiDeleteOutline />
    </div>
  );
};

export default Task;
