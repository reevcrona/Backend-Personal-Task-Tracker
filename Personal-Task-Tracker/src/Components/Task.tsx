import { TaskProps } from "../types";
const Task = ({ title, description, category }: TaskProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{category}</h3>
      <h4>{description}</h4>
    </div>
  );
};

export default Task;
