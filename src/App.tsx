import { useState, useReducer } from "react";
import "./App.css";
import List from "./components/List";
import type { Task, ColumnKey } from "./types";

type Action =
  | { type: "ADD"; text: string }
  | { type: "MOVE"; taskId: string; to: ColumnKey }
  | { type: "CLEAR_DONE" };

function tasksReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD": {
  const newTask: Task = {
    id: Date.now().toString(),
    text: action.text,
    column: "todo",
  };
  return [...state, newTask];
}
    case "MOVE":
  return state.map(t => (t.id === action.taskId ? { ...t, column: action.to } : t));

    case "CLEAR_DONE":
  return state.filter(t => t.column !== "done");

    default:
      return state;
  }
}


function App() {
  type Filter = "all" | "active" | "completed";

  //const [tasks, setTasks] = useState<Task[]>([]);
  const [tasks, dispatch] = useReducer(tasksReducer, [] as Task[]);
  const [newText, setNewText] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  
  const addTask = () => {
  const text = newText.trim();
  if (!text) return;
  dispatch({ type: "ADD", text });
  setNewText("");
};


  //const moveTask = (taskId: string, to: ColumnKey) => {
    //setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, column: to } : t)));
  //};

  const moveTask = (taskId: string, to: ColumnKey) => {
  dispatch({ type: "MOVE", taskId, to });
};


  //const clearDone = () => {
    //setTasks(prev => prev.filter(t => t.column !== "done"));
  //};

  const clearDone = () => {
  dispatch({ type: "CLEAR_DONE" });
};

  function visibleColumns(f: Filter): ColumnKey[] {
    if (f === "all") return ["todo", "inprogress", "done"];
    if (f === "active") return ["todo", "inprogress"];
    return ["done"]; // completed
  }

  const cols = visibleColumns(filter);

  return (
    <div className="page">
      <h2>Task List</h2>

      <div className="addbar">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="New task for To Do"
        />
        <button onClick={addTask}>Add</button>

        <button id="clear-done" onClick={clearDone}>Clear Done</button>
      </div>

      <div className="filters" style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setFilter("all")} disabled={filter==="all"}>All</button>
        <button onClick={() => setFilter("active")} disabled={filter==="active"}>Active</button>
        <button onClick={() => setFilter("completed")} disabled={filter==="completed"}>Completed</button>
      </div>


      <div id="container">
        {cols.includes("todo") && (
    <List
      title="To Do"
      columnKey="todo"
      tasks={tasks.filter(t => t.column === "todo")}
      onDropTo={moveTask}
    />
  )}

  {cols.includes("inprogress") && (
    <List
      title="In Progress"
      columnKey="inprogress"
      tasks={tasks.filter(t => t.column === "inprogress")}
      onDropTo={moveTask}
    />
  )}

  {cols.includes("done") && (
    <List
      title="Done"
      columnKey="done"
      tasks={tasks.filter(t => t.column === "done")}
      onDropTo={moveTask}
    />
  )}
      </div>
    </div>
  );
}

export default App;
