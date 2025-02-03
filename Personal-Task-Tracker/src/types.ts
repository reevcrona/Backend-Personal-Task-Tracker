export interface TaskType {
  title: string;
  id: string;
  description: string;
}
export interface TaskProps {
  title: string;
  id: string;
  description: string;
}
export interface taskInputProps {
  InputAddTask: (task: TaskType) => void;
}
export interface LightboxProps {
  children: JSX.Element;
}
