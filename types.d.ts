export interface Action {}

export interface Task {
  id: number;
  text: string;
  selected: boolean;
}

export interface Todo {
  id: number;
  title: string;
  tasks: Task[];
}
