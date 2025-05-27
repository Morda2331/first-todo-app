let tasks = [];

// Функция обновления счётчика задач
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const remaining = total - completed;
  const statsDiv = document.getElementById('task-stats');
  statsDiv.textContent = `Всего: ${total} | Выполнено: ${completed} | Осталось: ${remaining}`;
}

// Загрузка задач из localStorage
window.onload = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => addTaskToDOM(task));
  }
  updateStats(); // обновляем счётчик после загрузки
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
    updateStats(); // обновляем счётчик после добавления
    input.value = '';
  }
});

// Добавить задачу в DOM
function addTaskToDOM(task) {
  const list = document.getElementById('todo-list');

  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');
  li.textContent = task.text;

  // Изначальная установка слушателей (клик, удаление)
  setupListeners(li, task);

  list.appendChild(li);
}

// Вынес обработчики в функцию, чтобы можно было заново их добавить после редактирования
function setupListeners(li, task) {
  // Клик — отметка выполнено
  li.onclick = () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats(); // обновляем счётчик при изменении статуса
  };

  // Удаление через кнопку
  // Удаляем старую кнопку, если есть
  const oldBtn = li.querySelector('button');
  if (oldBtn) oldBtn.remove();

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats(); // обновляем счётчик после удаления
  };
  li.appendChild(deleteBtn);
}
