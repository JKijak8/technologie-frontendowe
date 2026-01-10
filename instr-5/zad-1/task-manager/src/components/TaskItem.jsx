import { useState } from "react";
import { useTasks } from "../context/TasksContext";

function TaskItem({ id, title, completed, priority, category }) {
  const { toggleTask, deleteTask, changePriority, updateTask } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleSave = () => {
    if (editTitle.trim().length >= 3) {
      updateTask(id, editTitle);
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
        onChange={() => toggleTask(id)}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <select
          value={priority}
          onChange={(e) => changePriority(id, e.target.value)}
          className={`priority-tag ${priority}`}
          disabled={isEditing}
        >
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
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
            <button className="delete" onClick={() => deleteTask(id)}>
              Usuń
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
