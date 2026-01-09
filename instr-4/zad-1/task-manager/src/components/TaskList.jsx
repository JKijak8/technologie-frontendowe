import TaskItem from "./TaskItem";

function TaskList() {
  return (
    <ul className="task-list">
      <TaskItem />
      <TaskItem />
      <TaskItem />
    </ul>
  );
}

export default TaskList;
