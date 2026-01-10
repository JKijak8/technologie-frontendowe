// context/TasksContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { tasksApi } from "../api/tasksApi";

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks_data");
    return saved ? JSON.parse(saved) : [];
  });
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
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const changePriority = (id, newPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, priority: newPriority } : t))
    );
  };

  const clearAllTasks = () => {
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie zadania?")) {
      setTasks([]);
    }
  };

  const value = {
    tasks,
    isLoading,
    isSaving,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    changePriority,
    clearAllTasks,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
