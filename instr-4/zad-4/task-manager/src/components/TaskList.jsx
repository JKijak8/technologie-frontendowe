import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  onToggle,
  onDelete,
  onChangePriority,
  onUpdateTask,
}) {
  if (tasks.length === 0) {
    return <p className="empty-list-info">Brak zadań</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          onToggle={onToggle}
          onDelete={onDelete}
          onChangePriority={onChangePriority}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
