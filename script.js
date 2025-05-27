let tasks = [];

window.onload = () => {
  // Загружаем задачи из localStorage
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => addTaskToDOM(task));
  }
};

// Добавление новой задачи
document.getElementById('add-btn').onclick = () => {
  const input = document.getElementById('task-input');
  const text = input.value.trim();

  if (text !== '') {
    tasks.push(text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(text);
    input.value = '';
  }
};

function addTaskToDOM(taskText) {
  const list = document.getElementById('todo-list');

  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = () => {
    list.removeChild(li);
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  li.appendChild(deleteBtn);
  list.appendChild(li);
}
