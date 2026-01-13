const todoInput =document.getElementById("todoInput");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function render(filter = "all", search = "") {
     todoList.innerHTML = "";
    todos
     .filter(t => filter === "all" ||
        (filter === "completed" && t.completed) ||
        (filter === "pending" && !t.completed))
    .filter(t => t.text.toLowerCase().includes(search))
    .forEach((todo, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todoInfo">
                <span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
                <span class="category">${todo.category}</span>
            </div>
            <div class="actions">
                <button onclick="toggleComplete(${index})">✔️</button>
                <button onclick="remove(${index})">🗑️</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}


addBtn.onclick = () => {
    if (!todoInput.value.trim()) return;
    todos.push({
        text: todoInput.value,
        category: categorySelect.value,
        completed: false
    });
    todoInput.value = "";
    save();
    render();
};

function toggleComplete(i) {
    todos[i].completed = !todos[i].completed;
    save(); render();
}

function remove(i) {
    todos.splice(i, 1);
    save(); render();
}

document.querySelectorAll(".filter").forEach(btn => {
    btn.onclick = () => {
        document.querySelector(".filter.active").classList.remove("active");
        btn.classList.add("active");
        render(btn.dataset.filter);
    };
});

searchInput.oninput = () => render(document.querySelector(".filter.active").dataset.filter, searchInput.value.toLowerCase());

themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};

render();