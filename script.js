let tasks = [];

function renderTask(text, completed = false) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = text;
    if (completed) {
        taskText.classList.add('completed');
    }

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Выполнено';
    completeBtn.addEventListener('click', () => {
        taskText.classList.toggle('completed');
        const task = tasks.find(t => t.text === text);
        if (task) task.completed = !task.completed;
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        tasks = tasks.filter(t => t.text !== text);
        saveTasks();
    });

    li.appendChild(taskText);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    document.getElementById('todo-list').appendChild(li);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => renderTask(task.text, task.completed));
    }
}

document.getElementById('todo-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (text !== '') {
        tasks.push({ text, completed: false });
        renderTask(text);
        saveTasks();
        input.value = '';
    }
});

loadTasks();
