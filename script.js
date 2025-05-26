// Загружаем задачи из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTask(task));
});

// Обработчик формы — добавление задачи
document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const task = input.value.trim();
    if (task !== '') {
        addTask(task);
        input.value = '';
        saveTasks();
    }
});

// Добавляем задачу в список
function addTask(task) {
    const list = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = task;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Delete';
    removeBtn.onclick = () => {
        list.removeChild(li);
        saveTasks();
    };

    li.appendChild(removeBtn);
    list.appendChild(li);
}

// Сохраняем задачи в localStorage
function saveTasks() {
    const list = document.getElementById('todo-list');
    const tasks = [];
    list.querySelectorAll('li').forEach(li => {
        // Убираем текст кнопки Delete из текста задачи
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
