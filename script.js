let tasks = [];

// Загружаем задачи при старте
window.onload = () => {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => addTaskToDOM(task));
  }
};

// Обработка формы
document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const text = input.value.trim();

  if (text !== '') {
    tasks.push(text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(text);
    input.value = '';
  }
});

// Функция добавления задачи в список
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
