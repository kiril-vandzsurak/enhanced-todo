import ItemList from "./ItemList";
import type { Task, ColumnKey } from "../types";
import React, { useCallback } from "react";

type Props = {
  title: string;                                 
  columnKey: ColumnKey;                          
  tasks: Task[];                                 
  onDropTo: (taskId: string, column: ColumnKey) => void; 
};

function List({ title, columnKey, tasks, onDropTo }: Props) {
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) onDropTo(taskId, columnKey);
  }, [onDropTo, columnKey]);

  return (
    <div className="list" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="listHead"><h3>{title}</h3></div>
      <div className="listBody">
        {tasks.length === 0 ? <div className="empty">Drop here</div>
                            : tasks.map(t => <ItemList key={t.id} task={t} />)}
      </div>
    </div>
  );
}

export default React.memo(List);
