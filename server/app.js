const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());  // Разрешаем все источники

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('To-Do API работает! Используйте /tasks для работы с задачами.');
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


