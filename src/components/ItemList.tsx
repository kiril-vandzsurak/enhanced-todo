import type { Task } from "../types";

function ItemList({ task }: { task: Task }) {
  return (
    <div
      className="item"
      draggable                          
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
      }}
    >
      {task.text}
    </div>
  );
}

export default ItemList;
