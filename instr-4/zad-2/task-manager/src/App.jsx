import "./App.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Card from "./components/Card";

function App() {
  const tasks = [
    { id: 101, title: "Placeholder 1", completed: true, priority: "high" },
    { id: 102, title: "Placeholder 2", completed: false, priority: "medium" },
    { id: 103, title: "Placeholder 3", completed: false, priority: "low" },
  ];

  return (
    <div className="app-container">
      <Header />

      <main>
        <Card title="Lista do zrobienia" className="tasks-wrapper">
          <TaskList tasks={tasks} />
        </Card>
      </main>
    </div>
  );
}

export default App;
