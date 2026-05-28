export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  tags: string[];
  assigneeInitials: string;
}

export type ColumnId = "todo" | "in-progress" | "done";

export interface Column {
  id: ColumnId;
  title: string;
  tasks: Task[];
  dotColor: string;
}

export interface BoardState {
  columns: Record<ColumnId, Column>;
}
