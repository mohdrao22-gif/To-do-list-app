let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", function() {
    let task = taskInput.value;
    if (task.trim() === "") {
        alert("Please enter a task!");
        return;
    }
    let taskObj = { text: task, done: false };
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    addTaskToPage(taskObj);
});

function addTaskToPage(taskObj) {
    let li = document.createElement("li");

    let circle = document.createElement("span");
    circle.textContent = taskObj.done ? "✔" : "○";
    circle.style.cursor = "pointer";
    circle.style.marginRight = "8px";
    li.appendChild(circle);

    let text = document.createElement("span");
    text.textContent = taskObj.text;
    if (taskObj.done) {
        text.style.textDecoration = "line-through";
        text.style.color = "gray";
    }
    li.appendChild(text);

    circle.addEventListener("click", function() {
        taskObj.done = !taskObj.done;
        if (taskObj.done) {
            circle.textContent = "✔";
            text.style.textDecoration = "line-through";
            text.style.color = "gray";
        } else {
            circle.textContent = "○";
            text.style.textDecoration = "none";
            text.style.color = "";
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    let deleteBtn = document.createElement("span");
    deleteBtn.textContent = "×";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "auto";
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function() {
        li.remove();
        tasks = tasks.filter(function(t) {
            return t !== taskObj;
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    taskList.appendChild(li);
}

tasks.forEach(function(taskObj) {
    addTaskToPage(taskObj);
});