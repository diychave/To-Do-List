const apiUrl = 'http://localhost:3000/tasks';
const taskList = document.getElementById('task-list');
const form = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const statusSelect = document.getElementById('status');

// Получить задачи при загрузке
window.addEventListener('DOMContentLoaded', loadTasks);

// Отправка формы
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const task = {
    title: titleInput.value,
    description: descriptionInput.value,
    status: statusSelect.value,
  };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  if (res.ok) {
    form.reset();
    loadTasks();
  }
});

async function loadTasks() {
  taskList.innerHTML = '';
  const res = await fetch(apiUrl);
  const tasks = await res.json();

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${task.title}</strong> – ${task.description} (${task.status})
      <button onclick="deleteTask(${task.id})">Удалить</button>
      <button onclick='editTask(${JSON.stringify(task)})'>Редактировать</button>
    `;
    taskList.appendChild(li);
  });
}

async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  loadTasks();
}

function editTask(task) {
  const newTitle = prompt('Новый заголовок:', task.title);
  const newDescription = prompt('Новое описание:', task.description);
  const newStatus = prompt('Новый статус (pending, in progress, completed):', task.status);

  if (newTitle !== null && newStatus !== null) {
    fetch(`${apiUrl}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
        status: newStatus
      })
    }).then(() => loadTasks());
  }
}
