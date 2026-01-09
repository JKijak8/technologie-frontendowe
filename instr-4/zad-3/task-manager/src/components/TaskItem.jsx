function TaskItem({
  id,
  title,
  completed,
  priority,
  onToggle,
  onDelete,
  onChangePriority,
}) {
  return (
    <li className="list-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />

      <select
        value={priority}
        onChange={(e) => onChangePriority(id, e.target.value)}
        className={`priority-tag ${priority}`}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <label
        style={{
          textDecoration: completed ? "line-through" : "none",
          opacity: completed ? 0.6 : 1,
          flexGrow: 1,
          textAlign: "left",
        }}
      >
        {title}
      </label>

      <button className="delete" onClick={() => onDelete(id)}>
        Usuń
      </button>
    </li>
  );
}

export default TaskItem;
