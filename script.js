const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(){

  if(taskInput.value.trim() === ""){
    return;
  }

  const task = {
    text: taskInput.value,
    completed:false
  };

  saveTask(task);
  displayTask(task);

  taskInput.value = "";
}

function displayTask(task){

  const li = document.createElement("li");

  if(task.completed){
    li.classList.add("completed");
  }

  li.innerHTML = `
    <span onclick="toggleComplete(this)">
      ${task.text}
    </span>

    <button onclick="deleteTask(this)">
      Delete
    </button>
  `;

  taskList.appendChild(li);
}

function toggleComplete(element){
  element.parentElement.classList.toggle("completed");
  updateLocalStorage();
}

function deleteTask(element){
  element.parentElement.remove();
  updateLocalStorage();
}

function saveTask(task){

  let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function loadTasks(){

  let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task=>{
    displayTask(task);
  });
}

function updateLocalStorage(){

  const tasks = [];

  document.querySelectorAll("li").forEach(li=>{

    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });

  });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}
