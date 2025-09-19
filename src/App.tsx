import { useState } from "react";
import "./App.css";
import List from "./components/List";
import type { Task, ColumnKey } from "./types";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newText, setNewText] = useState<string>("");

  
  const addTask = () => {
    const text = newText.trim();
    if (!text) return; 
    const newTask: Task = {
      id: Date.now().toString(), 
      text,
      column: "todo",           
    };
    setTasks(prev => [...prev, newTask]); 
    setNewText("");
  };

  const moveTask = (taskId: string, to: ColumnKey) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, column: to } : t)));
  };

  const clearDone = () => {
    setTasks(prev => prev.filter(t => t.column !== "done"));
  };

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

      <div id="container">
        <List
          title="To Do"
          columnKey="todo"
          tasks={tasks.filter(t => t.column === "todo")}
          onDropTo={moveTask}
        />
        <List
          title="In Progress"
          columnKey="inprogress"
          tasks={tasks.filter(t => t.column === "inprogress")}
          onDropTo={moveTask}
        />
        <List
          title="Done"
          columnKey="done"
          tasks={tasks.filter(t => t.column === "done")}
          onDropTo={moveTask}
        />
      </div>
    </div>
  );
}

export default App;
