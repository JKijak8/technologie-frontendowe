const LOCAL_STORAGE_KEY = "tasks_data";

export const tasksApi = {
  fetchTasks: (signal) => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        resolve(savedTasks ? JSON.parse(savedTasks) : []);
      }, 1500);

      signal?.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Aborted", "AbortError"));
      });
    });
  },

  saveTasks: (tasks) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
        resolve({ success: true });
      }, 800);
    });
  },
};
