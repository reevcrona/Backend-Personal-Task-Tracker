import React from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { taskInputProps, TaskType } from "../types";

const TaskInput = ({ InputAddTask }: taskInputProps) => {
  const [titleInputValue, setTitleInputValue] = useState<string>("");
  const [descInputValue, setDescInputValue] = useState<string>("");
  const [categoryInputValue, setCategoryInputValue] = useState<string>("");

  const addTaskToList = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newTask: TaskType = {
      title: titleInputValue,
      id: nanoid(),
      description: descInputValue,
      category: categoryInputValue,
    };
    InputAddTask(newTask);
    setTitleInputValue("");
    setDescInputValue("");
  };

  const onchangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateSetter: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    stateSetter(e.target.value);
  };

  return (
    <form onSubmit={(e) => addTaskToList(e)}>
      <label htmlFor="title-input">Title</label>
      <input
        id="title-input"
        type="text"
        required
        minLength={1}
        placeholder="Task Title"
        onChange={(e) => onchangeHandler(e, setTitleInputValue)}
        value={titleInputValue}
      ></input>
      <label htmlFor="description-input"></label>
      <input
        id="description-input"
        type="text"
        placeholder="Task Description"
        onChange={(e) => onchangeHandler(e, setDescInputValue)}
        value={descInputValue}
      ></input>
      <label htmlFor="category-input"></label>
      <input
        id="category-input"
        type="text"
        placeholder="Task Category"
        onChange={(e) => onchangeHandler(e, setCategoryInputValue)}
        value={categoryInputValue}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
