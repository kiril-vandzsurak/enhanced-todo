export type ColumnKey = "todo" | "inprogress" | "done";

export type Task = {
  id: string;
  text: string;
  column: ColumnKey;
};
