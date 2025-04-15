const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Получение всех задач
router.get('/', taskController.getTasks);

// Создание новой задачи
router.post('/', taskController.createTask);

// Обновление задачи
router.put('/:id', taskController.updateTask);

// Удаление задачи
router.delete('/:id', taskController.deleteTask);

module.exports = router;


const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const { getUserById } = require('../models/User');

let tasks = []; // Для примера задачи храним в массиве

// Получить список задач (только свои задачи для обычного пользователя)
router.get('/', verifyToken, (req, res) => {
  const user = getUserById(req.userId);
  const userTasks = tasks.filter(task => task.userId === user.id || user.role === 'admin');
  res.json(userTasks);
});

// Создать новую задачу
router.post('/', verifyToken, (req, res) => {
  const { title, description, status } = req.body;
  const user = getUserById(req.userId);
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    userId: user.id, // Ассоциируем задачу с пользователем
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Обновить задачу
router.put('/:id', verifyToken, (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const user = getUserById(req.userId);
  if (task.userId !== user.id && user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  res.json(task);
});

// Удалить задачу
router.delete('/:id', verifyToken, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  const task = tasks[taskIndex];
  const user = getUserById(req.userId);
  if (task.userId !== user.id && user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;
