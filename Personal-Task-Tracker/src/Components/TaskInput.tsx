import React from "react";
import { useState } from "react";
const TaskInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <form>
      <label htmlFor="task-input"></label>
      <input id="task-input" placeholder="Add task here"></input>
    </form>
  );
};

export default TaskInput;
