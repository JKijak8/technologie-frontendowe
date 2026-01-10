import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Card from "./components/Card";
import FilterButtons from "./components/FilterButtons";
import TaskForm from "./components/TaskForm";
import TaskStats from "./components/TaskStats";
import { TasksProvider, useTasks } from "./context/TasksContext";
import { FilterProvider, useFilters } from "./context/FilterContext";

function AppContent() {
  const { isSaving, isLoading, clearAllTasks } = useTasks();
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    categoryFilter,
    setCategoryFilter,
  } = useFilters();

  return (
    <div className="app-container">
      <Header />
      {isSaving && <div className="saving-indicator">Zapisywanie...</div>}

      <main>
        <Card title="Statystyki">
          <TaskStats />
        </Card>

        <Card title="Dodaj nowe zadanie">
          <TaskForm />
        </Card>

        <Card title="Lista do zrobienia" className="tasks-wrapper">
          <div className="controls-row search-row">
            <input
              type="text"
              placeholder="🔍 Szukaj zadania..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Domyślnie</option>
              <option value="priority">Priorytet</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>

          <hr className="divider" />

          <div className="controls-row filters-row">
            <div className="filters-left">
              <FilterButtons />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="category-select"
              >
                <option value="all">Wszystkie kat.</option>
                <option value="Praca">Praca</option>
                <option value="Dom">Dom</option>
                <option value="Zakupy">Zakupy</option>
                <option value="Inne">Inne</option>
              </select>
            </div>

            <button
              onClick={clearAllTasks}
              className="delete-btn-small"
              title="Usuń wszystkie zadania"
            >
              🗑️
            </button>
          </div>

          <div className="list-container">
            {isLoading ? (
              <div className="skeleton">Wczytywanie zadań...</div>
            ) : (
              <TaskList />
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <TasksProvider>
      <FilterProvider>
        <AppContent />
      </FilterProvider>
    </TasksProvider>
  );
}
