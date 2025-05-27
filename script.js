let tasks = [];
let currentFilter = 'all'; // all, active, completed

window.onload = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
  }
  renderTasks();
  updateStats();
  setupFilterButtons();
};

document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();

  if (text !== '') {
    tasks.push({ text, completed: false });
    saveAndRender();
    input.value = '';
  }
});

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  updateStats();
}

function renderTasks() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  let filteredTasks = [];
  if (currentFilter === 'all') filteredTasks = tasks;
  else if (currentFilter === 'active') filteredTasks = tasks.filter(t => !t.completed);
  else if (currentFilter === 'completed') filteredTasks = tasks.filter(t => t.completed);

  filteredTasks.forEach(task => addTaskToDOM(task));
}

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
    saveAndRender();
  };

  // Кнопка "Удалить"
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t !== task);
    saveAndRender();
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
        saveAndRender();
      } else {
        renderTasks();
      }
    }
  });

  li.appendChild(textSpan);
  li.appendChild(doneBtn);
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

function setupFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.onclick = () => {
      currentFilter = btn.getAttribute('data-filter');
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTasks();
    };
  });
}
