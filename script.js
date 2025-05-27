let tasks = [];

// Загрузка задач из localStorage
window.onload = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => addTaskToDOM(task));
  }
};

// Добавление новой задачи
document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();

  if (text !== '') {
    const newTask = { text, completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(newTask);
    input.value = '';
  }
});

// Добавить задачу в DOM
function addTaskToDOM(task) {
  const list = document.getElementById('todo-list');

  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.completed) li.classList.add('completed');

  // Отметка выполнено
  li.addEventListener('click', () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  // Кнопка удаления
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = (e) => {
    e.stopPropagation(); // не переключает completed при удалении
    list.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  li.appendChild(deleteBtn);
  list.appendChild(li);
}
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;
  const statsDiv = document.getElementById('task-stats');
  statsDiv.textContent = `Всего: ${total} | Выполнено: ${completed} | Осталось: ${remaining}`;
}
