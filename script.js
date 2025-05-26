document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const task = input.value.trim();
    if (task !== '') {
        addTask(task);
        input.value = '';
    }
});

function addTask(task) {
    const list = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = task;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Delete';
    removeBtn.onclick = () => list.removeChild(li);
    li.appendChild(removeBtn);
    list.appendChild(li);
}
