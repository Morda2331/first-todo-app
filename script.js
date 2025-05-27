let tasks = [];

// Обновление счётчика задач
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const remaining = total - completed;
  const statsDiv = document.getElementById('task-stats');
  statsDiv.textContent = `Всего: ${total} | Выполнено: ${completed} | Осталось: ${remaining}`;
}

// Загрузка задач при старте
window.onload = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => addTaskToDOM(task));
  }
  updateStats();
};

// Обработка добавления новой задачи
document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();

  if (text !== '') {
    const newTask = { text, completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(newTask);
    updateStats();
    input.value = '';
  }
});

// Добавление задачи в DOM
function addTaskToDOM(task) {
  const list = document.getElementById('todo-list');

  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');
  li.textContent = task.text;

  // Двойной клик — редактирование задачи
  li.addEventListener('dblclick', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';
    li.innerHTML = '';
    li.appendChild(input);
    input.focus();

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveEdit();
      }
    });

    input.addEventListener('blur', saveEdit);

    function saveEdit() {
      const newText = input.value.trim();
      if (newText !== '') {
        task.text = newText;
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
      li.textContent = task.text;
      setupListeners(li, task);
    }
  });

  setupListeners(li, task);
  list.appendChild(li);
}

// Обработчики нажатий (выполнено, удалить)
function setupListeners(li, task) {
  li.onclick = () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
  };

  const oldBtn = li.querySelector('button');
  if (oldBtn) oldBtn.remove();

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
  };
  li.appendChild(deleteBtn);
}
