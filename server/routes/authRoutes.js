const express = require('express');
const { register, login } = require('../controllers/authController'); // Исправьте на правильный импорт
const router = express.Router();

// Регистрация
router.post('/register', register); // Используем функцию register

// Вход
router.post('/login', login); // Используем функцию login

module.exports = router;
