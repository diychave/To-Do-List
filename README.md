# To-Do List 📝

Простое веб-приложение для управления списком задач с регистрацией и авторизацией пользователей.

## 🚀 Стек технологий

- **Backend:** Node.js, Express
- **Аутентификация:** JWT, bcryptjs
- **Frontend:** HTML, CSS, JS (Vanilla)
- **База данных:** пока что in-memory (в массиве)

## ⚙️ Установка и запуск

1. Клонируй репозиторий:
   \\\ash
   git clone https://github.com/diychave/To-Do-List.git
   cd To-Do-List
   \\\

2. Установи зависимости:
   \\\ash
   npm install
   \\\

3. Создай файл .env и добавь в него:
   \\\
   JWT_SECRET=твой_секретный_ключ
   \\\

4. Запусти сервер:
   \\\ash
   node app.js
   \\\

5. Перейди в браузере по адресу:
   \\\
   http://localhost:3000
   \\\



## ✅ Функциональность

- Регистрация пользователя
- Авторизация и JWT
- Сохранение токена в localStorage
- Перенаправление на To-Do страницу после входа
- Добавление и удаление задач (будет)


