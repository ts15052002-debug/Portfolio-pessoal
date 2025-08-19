const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Carregar tarefas salvas
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
};

// Função para adicionar tarefa
function addTask(taskText, completed = false) {
  if (taskText === "") return;

  const li = document.createElement("li");
  li.className = "task-item";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.onclick = () => {
    li.classList.toggle("completed");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Excluir";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  saveTasks();
}

// Evento de adicionar
addTaskBtn.addEventListener("click", () => addTask(taskInput.value));
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask(taskInput.value);
});

// Salvar no localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(item => {
    tasks.push({
      text: item.querySelector("span").textContent,
      completed: item.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}