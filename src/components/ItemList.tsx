import type { Task } from "../types";
import React, { useCallback } from "react";

function ItemList({ task }: { task: Task }) {
  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", task.id);
  }, [task.id]);

  return (
    <div
      className="item"
      draggable                          
      onDragStart={handleDragStart}
    >
      {task.text}
    </div>
  );
}

export default React.memo(ItemList);
