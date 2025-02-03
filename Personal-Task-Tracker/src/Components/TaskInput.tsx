import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { taskInputProps, TaskType } from "../types";

const TaskInput = ({ InputAddTask }: taskInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addTaskToList = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newTask: TaskType = {
      title: inputValue,
      id: nanoid(),
      description: "first task",
    };
    InputAddTask(newTask);
  };

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form onSubmit={(e) => addTaskToList(e)}>
      <label htmlFor="task-input"></label>
      <input
        id="task-input"
        placeholder="Add task here"
        onChange={(e) => onchangeHandler(e)}
        value={inputValue}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
