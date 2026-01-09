import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const validate = (value) => {
    if (value.length < 3) return "Tytuł musi mieć min. 3 znaki.";
    if (value.length > 100) return "Tytuł może mieć max. 100 znaków.";
    return "";
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setError(validate(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(title) && title.trim() !== "") {
      onAddTask(title, priority);
      setTitle("");
      setPriority("medium");
      setError("");
    }
  };

  const isInvalid = title.length < 3 || title.length > 100;

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Tytuł"
          value={title}
          onChange={handleTitleChange}
          style={{
            borderColor: error ? "red" : "#333",
            width: "100%",
            padding: "8px",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            marginTop: "5px",
          }}
        >
          <span style={{ color: "red" }}>{error}</span>
          <span style={{ color: title.length > 100 ? "red" : "#888" }}>
            {title.length}/100
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ flexGrow: 1 }}
        >
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        <button type="submit" disabled={isInvalid}>
          Dodaj zadanie
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
