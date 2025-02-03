import React from "react";
import { TaskProps } from "../types";
const Task = ({ title, id, description }: TaskProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{id}</h3>
      <h4>{description}</h4>
    </div>
  );
};

export default Task;
