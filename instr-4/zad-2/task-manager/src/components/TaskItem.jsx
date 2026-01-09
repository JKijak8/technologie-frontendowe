function TaskItem({ title, completed = false, priority = "medium" }) {
  return (
    <li className="list-item">
      <input type="checkbox" checked={completed} />

      <span className={`priority-tag ${priority}`}>({priority})</span>

      <label
        style={{
          textDecoration: completed ? "line-through" : "none",
          opacity: completed ? 0.6 : 1,
        }}
      >
        {title}
      </label>

      <button className="delete">Usuń</button>
    </li>
  );
}

export default TaskItem;
