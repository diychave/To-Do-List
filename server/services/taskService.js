const fs = require('fs');
const path = require('path');
const tasksFilePath = path.join(__dirname, '../tasks.json');

// Чтение задач из файла
function getTasks() {
  const rawData = fs.readFileSync(tasksFilePath);
  return JSON.parse(rawData);
}

// Сохранение задач в файл
function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Создание новой задачи
function createTask(title, description, status = 'pending') {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

// Обновление задачи
function updateTask(id, title, description, status) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) {
    throw new Error('Task not found');
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;

  saveTasks(tasks);
  return task;
}

// Удаление задачи
function deleteTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id !== parseInt(id));
  saveTasks(tasks);
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
