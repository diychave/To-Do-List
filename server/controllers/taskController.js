const taskService = require('../services/taskService');

// Получение всех задач
exports.getTasks = (req, res) => {
  try {
    const tasks = taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load tasks' });
  }
};

// Создание новой задачи
exports.createTask = (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = taskService.createTask(title, description, status);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Обновление задачи
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTask = taskService.updateTask(id, title, description, status);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Удаление задачи
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  try {
    taskService.deleteTask(id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
