class Task {
  constructor(text) {
    this.text = text;
    this.status = false;
    this.createdAt = new Date();
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
    this.taskListElement = document.getElementById("taskList");
    this.taskInput = document.getElementById("taskInput");
    this.addButton = document.getElementById("addBtn");

    this.addButton.addEventListener("click", () => this.addTask());
  }

  addTask() {
    const text = this.taskInput.value.trim(); //trims spaces from sides of text
    if (!text) return; //stops the function from making empty task
    const task = new Task(text);
    this.tasks.push(task); //adds new task to array of tasks
    this.taskInput.value = ""; //clears input 
    this.render();
  }

  markDone(index) {
    this.tasks[index].status = true; //marks a task as done
    this.render();
  }

  deleteTask(index) {
    this.tasks.splice(index, 1); //removes a task from the array of tasks
    this.render();
  }

  render() {
    this.taskListElement.innerHTML = "";

    this.tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      if (task.status) {
        taskText.style.textDecoration = "line-through";
      }

      const doneBtn = document.createElement("button");
      doneBtn.textContent = "Done";
      doneBtn.addEventListener("click", () => this.markDone(index));

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => this.deleteTask(index));

      li.appendChild(taskText);
      li.appendChild(doneBtn);
      li.appendChild(delBtn);

      this.taskListElement.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TodoList();
});