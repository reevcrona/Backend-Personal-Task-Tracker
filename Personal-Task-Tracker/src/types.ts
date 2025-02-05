type IsEditMode = boolean;

export interface TaskType {
  title: string;
  id: string;
  description: string;
  category: string;
  isCompleted: boolean;
  index: number;
}
export interface TaskProps {
  task: TaskType;
  deleteTask: (taskItem: TaskType) => void;
  completeTask: (taskItem: TaskType) => void;
  undoTask: (taskItem: TaskType) => void;
  setTaskToEdit: React.Dispatch<React.SetStateAction<TaskType | null>>;
  setIsEditModeActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLightboxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface taskInputProps {
  InputAddTask: (task: TaskType) => void;
  isEditModeActive: IsEditMode;
  taskToEdit: TaskType | null;
  editTask: (
    taskItem: TaskType,
    titleInput: string,
    descInput: string,
    categoryInput: string,
    e: React.FormEvent<HTMLFormElement>,
  ) => void;
  setIsEditModeActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLightboxOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface LightboxProps {
  children: JSX.Element;
}
