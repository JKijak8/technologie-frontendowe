function TaskItem() {
  return (
    <li className="list-item">
      <input type="checkbox" />
      <label htmlFor="">Item</label>
      <button className="delete">Usuń</button>
    </li>
  );
}

export default TaskItem;
