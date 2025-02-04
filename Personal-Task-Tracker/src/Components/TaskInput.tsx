import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { taskInputProps, TaskType } from "../types";

const TaskInput = ({
  InputAddTask,
  isEditModeActive,
  taskToEdit,
  editTask,
  taskIndexTracker,
  setTaskIndexTracker,
}: taskInputProps) => {
  const [titleInputValue, setTitleInputValue] = useState<string>("");
  const [descInputValue, setDescInputValue] = useState<string>("");
  const [categoryInputValue, setCategoryInputValue] = useState<string>("");

  useEffect(() => {
    if (isEditModeActive && taskToEdit) {
      setTitleInputValue(taskToEdit.title);
      setDescInputValue(taskToEdit.description);
      setCategoryInputValue(taskToEdit.category);
    }
  }, [isEditModeActive, taskToEdit]);

  const addTaskToList = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newTask: TaskType = {
      title: titleInputValue,
      id: nanoid(),
      description: descInputValue,
      category: categoryInputValue,
      isCompleted: false,
      index: taskIndexTracker,
    };
    InputAddTask(newTask);
    setTaskIndexTracker((prevState) => prevState + 1);
    setTitleInputValue("");
    setDescInputValue("");
  };

  const onchangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    stateSetter: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    stateSetter(e.target.value);
  };

  return (
    <form
      className="flex min-h-96 w-full max-w-xl flex-col items-center justify-center rounded bg-green-500"
      onSubmit={(e) => {
        isEditModeActive && taskToEdit
          ? editTask(
              taskToEdit,
              titleInputValue,
              descInputValue,
              categoryInputValue,
              e,
            )
          : addTaskToList(e);
      }}
    >
      <h1 className="mb-5 text-2xl font-medium text-white">
        Create your new task below
      </h1>
      <label
        className="w-full max-w-56 text-left font-medium text-white"
        htmlFor="title-input"
      >
        Title
      </label>
      <input
        className="mb-2 w-full max-w-56 rounded border-2 border-black pl-1 placeholder-black focus:placeholder-transparent focus:outline-none"
        id="title-input"
        type="text"
        required
        minLength={1}
        placeholder="Task Title"
        onChange={(e) => onchangeHandler(e, setTitleInputValue)}
        value={titleInputValue}
      ></input>
      <label
        className="w-full max-w-56 text-left font-medium text-white"
        htmlFor="description-input"
      >
        Description
      </label>
      <input
        className="mb-2 w-full max-w-56 rounded border-2 border-black pl-1 placeholder-black focus:placeholder-transparent focus:outline-none"
        id="description-input"
        type="text"
        placeholder="Task Description"
        onChange={(e) => onchangeHandler(e, setDescInputValue)}
        value={descInputValue}
      ></input>
      <label
        className="w-full max-w-56 text-left font-medium text-white"
        htmlFor="category-input"
      >
        Category
      </label>
      <input
        className="w-full max-w-56 rounded border-2 border-black pl-1 placeholder-black focus:placeholder-transparent focus:outline-none"
        id="category-input"
        type="text"
        placeholder="Task Category"
        onChange={(e) => onchangeHandler(e, setCategoryInputValue)}
        value={categoryInputValue}
      ></input>

      <button
        className="mt-6 flex h-9 w-20 items-center justify-center border-2 border-black bg-transparent text-lg font-medium text-white transition-colors duration-500 ease-in-out hover:bg-black"
        type="submit"
      >
        {isEditModeActive ? "Accept changes" : "Add"}
      </button>
    </form>
  );
};

export default TaskInput;
