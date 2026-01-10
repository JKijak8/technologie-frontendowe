import { useState } from "react";

function TaskItem({
  id,
  title,
  completed,
  priority,
  category,
  onToggle,
  onDelete,
  onChangePriority,
  onUpdateTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSave = () => {
    if (editTitle.trim().length >= 3) {
      onUpdateTask(id, editTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <li className="list-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <select
          value={priority}
          onChange={(e) => onChangePriority(id, e.target.value)}
          className={`priority-tag ${priority}`}
          disabled={isEditing}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <span className={`category-badge cat-${category?.toLowerCase()}`}>
          {category || "Inne"}
        </span>
      </div>

      {isEditing ? (
        <input
          className="edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ flexGrow: 1 }}
        />
      ) : (
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
      )}

      <div className="button-group">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Zapisz</button>
            <button onClick={handleCancel}>Anuluj</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edytuj</button>
            <button className="delete" onClick={() => onDelete(id)}>
              Usuń
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
