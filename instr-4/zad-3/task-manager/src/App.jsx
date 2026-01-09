import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Card from "./components/Card";
import FilterButtons from "./components/FilterButtons";
import TaskStats from "./components/TaskStats";

function App() {
  const [tasks, setTasks] = useState([
    { id: 101, title: "Placeholder 1", completed: true, priority: "high" },
    { id: 102, title: "Placeholder 2", completed: false, priority: "medium" },
    { id: 103, title: "Placeholder 3", completed: false, priority: "low" },
  ]);

  const [filter, setFilter] = useState("all");

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <Header />
      <main>
        <TaskStats tasks={tasks} />

        <Card title="Lista do zrobienia" className="tasks-wrapper">
          <FilterButtons currentFilter={filter} setFilter={setFilter} />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onChangePriority={changePriority}
          />
        </Card>
      </main>
    </div>
  );
}

export default App;
