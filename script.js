const form = document.getElementById("form-create");
const input = document.getElementById("form-input");
const todoWrapper = document.getElementById("list-group-todo");
const themeToggler = document.getElementById("themeToggler");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function createTodoItem(todo) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  if (todo.completed) {
    todoItem.classList.add("checked");
  }

  const todoContent = document.createElement("div");
  todoContent.classList.add("todo-content");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => toggleTodoStatus(todo, todoItem));

  const label = document.createElement("label");
  label.textContent = todo.text;
  if (todo.completed) {
    label.classList.add("completed");
  }

  todoContent.appendChild(checkbox);
  todoContent.appendChild(label);
  todoItem.appendChild(todoContent);

  return todoItem;
}

function addTodo(e) {
  e.preventDefault();
  const newTodo = input.value.trim();
  if (newTodo) {
    const todo = { text: newTodo, completed: false };
    const todoItem = createTodoItem(todo);
    todoWrapper.appendChild(todoItem);
    todos.push(todo);
    saveTodos();
    input.value = "";
  }
}

function toggleTheme() {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleTodoStatus(todo, todoItem) {
  todo.completed = !todo.completed;
  const label = todoItem.querySelector("label");
  label.classList.toggle("completed");
  todoItem.classList.toggle("checked");
  saveTodos();
}

todos.forEach((todo) => {
  const todoItem = createTodoItem(todo);
  todoWrapper.appendChild(todoItem);
});

form.addEventListener("submit", addTodo);
themeToggler.addEventListener("click", toggleTheme);
