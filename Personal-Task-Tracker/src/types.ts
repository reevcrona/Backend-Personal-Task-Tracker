export interface TaskType {
  title: string;
  id: string;
  description: string;
  category: string;
  isCompleted: boolean;
}
export interface TaskProps {
  task: TaskType;
  deleteTask: (taskItem: TaskType) => void;
  completeTask: (taskItem: TaskType) => void;
}
export interface taskInputProps {
  InputAddTask: (task: TaskType) => void;
}
export interface LightboxProps {
  children: JSX.Element;
}
