let promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "Dane 1 załadowane.");
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 800, "Dane 2 załadowane.");
});

let promiseTimeout = new Promise((resolve, reject) => {
  setTimeout(reject, 1000, "Timeout.");
});

console.log("Ładowanie danych promises");
Promise.race([Promise.all([promise1, promise2]), promiseTimeout])
  .then((messages) => {
    messages.forEach((message) => {
      console.log(message);
    });
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => console.log("Zakończono ładowanie danych."));

async function loadData() {
  console.log("Ładowanie danych (async/await)");

  try {
    console.log("Ładowanie sekwencyjne");

    const data1 = await promise1;
    console.log(data1);

    const data2 = await promise2;
    console.log(data2);

    console.log("Ładowanie równoległe");

    const parallelResult = await Promise.race([
      Promise.all([promise1, promise2]),
      promiseTimeout,
    ]);

    parallelResult.forEach((message) => {
      console.log(message);
    });
  } catch (error) {
    console.log("Błąd:", error);
  } finally {
    console.log("Zakończono ładowanie danych.");
  }
}

loadData();

const API_ROOT = "https://jsonplaceholder.typicode.com";
const usersContainer = document.getElementById("users-container");
const loader = document.getElementById("loader");
const errorBox = document.getElementById("error");
const refreshBtn = document.getElementById("refresh-btn");
const statusMessage = document.getElementById("status-message");

const postsContainer = document.getElementById("posts-container");
const postsUserName = document.getElementById("posts-user-name");
const postsList = document.getElementById("posts-list");
const closePostsBtn = document.getElementById("close-posts");

function showLoader() {
  loader.classList.remove("hidden");
  loader.setAttribute("aria-hidden", "false");
}
function hideLoader() {
  loader.classList.add("hidden");
  loader.setAttribute("aria-hidden", "true");
}
function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}
function clearError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

async function fetchUsers() {
  clearError();
  statusMessage.textContent = "";
  usersContainer.innerHTML = "";
  showLoader();
  try {
    const res = await fetch(`${API_ROOT}/users`);
    if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
    const users = await res.json();
    renderUsersTable(users);
    statusMessage.textContent = `Pobrano ${users.length} użytkowników.`;
  } catch (err) {
    if (err instanceof TypeError) {
      showError("Błąd sieci: sprawdź połączenie internetowe.");
    } else {
      showError(err.message || "Nieznany błąd.");
    }
    statusMessage.textContent = "";
  } finally {
    hideLoader();
  }
}

function renderUsersTable(users) {
  const table = document.createElement("table");
  table.className = "users-table";
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Imię / Firma</th>
      <th>Email</th>
      <th>Miasto</th>
      <th>Akcje</th>
    </tr>
  `;
  table.appendChild(thead);
  const tbody = document.createElement("tbody");

  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.classList.add("clickable");
    tr.setAttribute("role", "button");
    tr.tabIndex = 0;
    tr.dataset.userId = user.id;

    tr.innerHTML = `
      <td>${escapeHtml(
        user.name
      )} <div style="font-size:0.9rem;opacity:0.8">${escapeHtml(
      user.company?.name || ""
    )}</div></td>
      <td>${escapeHtml(user.email)}</td>
      <td>${escapeHtml(user.address?.city || "")}</td>
      <td><button data-user-id="${
        user.id
      }" class="open-posts">Pokaż posty</button></td>
    `;

    tr.addEventListener("click", (e) => {
      const btn = e.target.closest("button.open-posts");
      if (btn) {
        fetchPosts(user.id, user.name);
      } else {
        fetchPosts(user.id, user.name);
      }
    });

    tr.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fetchPosts(user.id, user.name);
      }
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  usersContainer.appendChild(table);
}

async function fetchPosts(userId, userName = "") {
  clearError();
  postsList.innerHTML = "";
  postsUserName.textContent = userName || "";
  postsContainer.classList.remove("hidden");
  showLoader();
  try {
    const res = await fetch(`${API_ROOT}/users/${userId}/posts`);
    if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
    const posts = await res.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      postsList.innerHTML = "<p>Brak postów dla tego użytkownika.</p>";
    } else {
      posts.forEach((p) => {
        const div = document.createElement("div");
        div.className = "post-card";
        div.innerHTML = `<h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(
          p.body
        )}</p>`;
        postsList.appendChild(div);
      });
    }
  } catch (err) {
    if (err instanceof TypeError) showError("Błąd sieci.");
    else showError(err.message || "Nieznany błąd podczas pobierania postów.");
  } finally {
    hideLoader();
  }
}

function escapeHtml(text) {
  if (!text && text !== 0) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

refreshBtn?.addEventListener("click", () => {
  fetchUsers();
});

closePostsBtn?.addEventListener("click", () => {
  postsContainer.classList.add("hidden");
  postsList.innerHTML = "";
  postsUserName.textContent = "";
});
