import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Card from "./components/Card";
import FilterButtons from "./components/FilterButtons";
import TaskForm from "./components/TaskForm";
import { tasksApi } from "./api/tasksApi";

const PRIORITY_MAP = { high: 3, medium: 2, low: 1 };

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks_data");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
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

  const addTask = (title, priority, category) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      category,
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

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) => {
      if (categoryFilter === "all") return true;
      return task.category === categoryFilter;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "priority")
        return PRIORITY_MAP[b.priority] - PRIORITY_MAP[a.priority];
      if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
      return 0;
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
            className="controls-bar"
            style={{
              marginBottom: "20px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Szukaj po tytule..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flexGrow: 2,
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #444",
                background: "#1a1a1a",
                color: "white",
              }}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ flexGrow: 1 }}
            >
              <option value="default">Domyślnie</option>
              <option value="priority">Wg Priorytetu</option>
              <option value="alphabetical">Alfabetycznie</option>
            </select>
          </div>

          <div
            className="filters-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <FilterButtons currentFilter={filter} setFilter={setFilter} />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Wszystkie kategorie</option>
                <option value="Praca">Praca</option>
                <option value="Dom">Dom</option>
                <option value="Zakupy">Zakupy</option>
                <option value="Inne">Inne</option>
              </select>
            </div>

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
          ) : filteredTasks.length === 0 ? (
            <div className="empty-list-info">
              {searchQuery
                ? `Nie znaleziono zadań dla frazy "${searchQuery}"`
                : "Brak zadań do wyświetlenia"}
            </div>
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
