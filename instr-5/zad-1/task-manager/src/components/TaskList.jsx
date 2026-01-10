import TaskItem from "./TaskItem";
import { useFilters } from "../context/FilterContext";

function TaskList() {
  const { filteredTasks, searchQuery } = useFilters();

  if (filteredTasks.length === 0) {
    return (
      <p className="empty-list-info">
        {searchQuery
          ? `Nie znaleziono zadań dla frazy "${searchQuery}"`
          : "Brak zadań do wyświetlenia"}
      </p>
    );
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </ul>
  );
}

export default TaskList;
