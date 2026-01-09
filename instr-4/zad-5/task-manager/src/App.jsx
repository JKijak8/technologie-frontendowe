import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Card from "./components/Card";
import FilterButtons from "./components/FilterButtons";
import TaskForm from "./components/TaskForm";
import { tasksApi } from "./api/tasksApi";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks_data");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await tasksApi.fetchTasks(controller.signal);
        setTasks(data);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Loading error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      setIsSaving(true);
      await tasksApi.saveTasks(tasks);
      setIsSaving(false);
    };

    saveData();
  }, [tasks]);

  const addTask = (title, priority) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, newTitle) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, priority: newPriority } : t))
    );
  };

  const clearAllTasks = () => {
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie zadania?")) {
      setTasks([]);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <Header />

      {isSaving && <div className="saving-indicator">Zapisywanie...</div>}

      <main>
        <Card title="Dodaj nowe zadanie">
          <TaskForm onAddTask={addTask} />
        </Card>

        <Card title="Lista do zrobienia" className="tasks-wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FilterButtons currentFilter={filter} setFilter={setFilter} />
            <button
              onClick={clearAllTasks}
              className="delete"
              style={{ marginBottom: "20px" }}
            >
              Wyczyść wszystko
            </button>
          </div>

          {isLoading ? (
            <div className="skeleton">Wczytywanie zadań...</div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onChangePriority={changePriority}
              onUpdateTask={updateTask}
            />
          )}
        </Card>
      </main>
    </div>
  );
}

export default App;
