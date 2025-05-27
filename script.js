let tasks = [];

window.onload = () => {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => addTaskToDOM(task));
  }
};

function addTaskToDOM(taskText) {
  const list = document.getElementById('todo-list');

  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Удалить';
  deleteBtn.onclick = () => {
    list.removeChild(li);
    tasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

document.getElementById('todo-form').onsubmit = function(e) {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToDOM(taskText);
    input.value = '';
  }
};
