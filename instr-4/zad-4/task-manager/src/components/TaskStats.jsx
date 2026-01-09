function TaskStats({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="card-container" style={{ textAlign: "left" }}>
      <h3>Statystyki:</h3>
      <ul>
        <li>
          Wszystkie: <strong>{total}</strong>
        </li>
        <li>
          Ukończone: <strong>{completed}</strong>
        </li>
        <li>
          Pozostało: <strong>{remaining}</strong>
        </li>
        <li>
          Postęp: <strong>{percentage}%</strong>
        </li>
      </ul>
    </div>
  );
}

export default TaskStats;
