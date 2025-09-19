import ItemList from "./ItemList";
import type { Task, ColumnKey } from "../types";

type Props = {
  title: string;                                 
  columnKey: ColumnKey;                          
  tasks: Task[];                                 
  onDropTo: (taskId: string, column: ColumnKey) => void; 
};

function List({ title, columnKey, tasks, onDropTo }: Props) {
  return (
    <div
      className="list"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("text/plain");
        if (taskId) onDropTo(taskId, columnKey);
      }}
    >
      <div className="listHead">
        <h3>{title}</h3>
      </div>

      <div className="listBody">
        {tasks.length === 0 ? (
          <div className="empty">Drop here</div>
        ) : (
          tasks.map(t => <ItemList key={t.id} task={t} />)
        )}
      </div>
    </div>
  );
}

export default List;
