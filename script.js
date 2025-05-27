let tasks = [];

// Обновляем статистику задач
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const remaining = total - completed;
  const statsDiv = document.getElementById('task-stats');
  statsDiv.textContent = `Всего: ${total} | Выполнено: ${completed} | Осталось: ${remaining}`;
}

// Загружаем задачи при открытии
window.onload = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => addTaskToDOM(task));
  }
  updateStats();
};

// Добавление задачи через форму
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

// Отображение задачи в списке
function addTaskToDOM(task) {
  const list = document.getElementById('todo-list');

  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');

  const textSpan = document.createElement('span');
  textSpan.textContent = task.text;

  // Кнопка "Выполнено"
  const doneBtn = document.createElement('button');
  doneBtn.textContent = task.completed ? '✅' : '☐';
  doneBtn.onclick = () => {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    doneBtn.textContent = task.completed ? '✅' : '☐';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
  };

  // Кнопка "Удалить"
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
  };

  // Редактирование по двойному клику
  textSpan.addEventListener('dblclick', () => {
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
      li.innerHTML = '';
      addTaskToDOM(task);
      updateStats();
    }
  });

  // Добавление элементов в строку
  li.innerHTML = '';
  li.appendChild(textSpan);
  li.appendChild(doneBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}
