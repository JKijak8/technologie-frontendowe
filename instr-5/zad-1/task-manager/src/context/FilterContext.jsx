// context/FilterContext.jsx
import { createContext, useContext, useState, useMemo } from "react";
import { useTasks } from "./TasksContext";

const FilterContext = createContext();

const PRIORITY_MAP = { high: 3, medium: 2, low: 1 };

export function FilterProvider({ children }) {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredTasks = useMemo(() => {
    return tasks
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
  }, [tasks, filter, categoryFilter, searchQuery, sortBy]);

  const value = {
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredTasks,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
