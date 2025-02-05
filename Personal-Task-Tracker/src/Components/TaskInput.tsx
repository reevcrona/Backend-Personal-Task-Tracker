import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { taskInputProps, TaskType } from "../types";
import { RxCross1 } from "react-icons/rx";

const TaskInput = ({
  InputAddTask,
  isEditModeActive,
  taskToEdit,
  editTask,
  setIsLightboxOpen,
  setIsEditModeActive,
}: taskInputProps) => {
  const [titleInputValue, setTitleInputValue] = useState<string>("");
  const [descInputValue, setDescInputValue] = useState<string>("");
  const [categoryInputValue, setCategoryInputValue] = useState<string>("Other");

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
      index: Infinity,
    };
    InputAddTask(newTask);
    setTitleInputValue("");
    setDescInputValue("");
  };

  const onchangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    stateSetter: React.Dispatch<React.SetStateAction<string>>,
  ): void => {
    stateSetter(e.target.value);
  };

  return (
    <form
      className="relative flex min-h-96 w-full max-w-xl flex-col items-center justify-center rounded bg-violet-900 p-6"
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
      <h1 className="mb-5 text-3xl font-medium text-white">
        {isEditModeActive ? "Edit mode" : "Create your new task below"}
      </h1>
      <label
        className="w-full max-w-80 text-left text-lg font-medium text-white"
        htmlFor="title-input"
      >
        Task Title
      </label>
      <input
        className="mb-2 min-h-10 w-full max-w-80 rounded border-2 border-black p-2 pl-1 text-lg placeholder-black focus:placeholder-transparent focus:outline-none"
        id="title-input"
        type="text"
        required
        minLength={1}
        onChange={(e) => onchangeHandler(e, setTitleInputValue)}
        value={titleInputValue}
      ></input>
      <label
        className="w-full max-w-80 text-left text-lg font-medium text-white"
        htmlFor="description-input"
      >
        Description
      </label>
      <textarea
        className="mb-2 w-full max-w-80 rounded border-2 border-black pl-1 placeholder-black focus:placeholder-transparent focus:outline-none"
        id="description-input"
        required
        minLength={1}
        onChange={(e) => onchangeHandler(e, setDescInputValue)}
        value={descInputValue}
      ></textarea>
      <label
        className="w-full max-w-80 text-left text-lg font-medium text-white"
        htmlFor="category-select"
      >
        Category
      </label>
      <select
        onChange={(e) => onchangeHandler(e, setCategoryInputValue)}
        value={categoryInputValue}
        className="mb-2 min-h-10 w-full max-w-80 rounded border-2 border-black pl-1 placeholder-black focus:placeholder-transparent focus:outline-none"
        name="category-select"
        id="category-select"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="School">School</option>
        <option value="Other">Other</option>
      </select>

      <button
        className="mt-6 flex h-9 w-36 items-center justify-center border-2 border-black bg-transparent text-lg font-medium text-white transition-colors duration-500 ease-in-out hover:bg-black"
        type="submit"
      >
        {isEditModeActive ? "Complete Edit" : "Create Task"}
      </button>
      <button
        type="button"
        onClick={() => {
          setIsLightboxOpen(false);
          setIsEditModeActive(false);
        }}
        className="absolute right-6 top-6 z-50 rounded-md border-2 border-white p-0.5 text-white hover:border-black hover:text-black"
      >
        <RxCross1 />
      </button>
    </form>
  );
};

export default TaskInput;
