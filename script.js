const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Загружаем сохранённые задачи из localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Отрисовываем все задачи при загрузке
tasks.forEach(task => renderTask(task.text, task.completed));

// Обработчик формы
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
        const newTask = { text, completed: false };
        tasks.push(newTask);
        renderTask(newTask.text, newTask.completed);
        updateLocalStorage();
        input.value = "";
    }
});

// Функция отрисовки задачи
function renderTask(text, completed) {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = text;
    if (completed) taskText.classList.add("completed");

    // Кнопка "Выполнено"
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✓";
    doneBtn.classList.add("done-btn");
    doneBtn.addEventListener("click", () => {
        taskText.classList.toggle("completed");

        // Обновляем статус в списке задач
        tasks = tasks.map(t => {
            if (t.text === text) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });

        updateLocalStorage();
    });

    // Кнопка "Удалить"
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        li.remove();

        // Удаляем задачу из массива
        tasks = tasks.filter(t => !(t.text === text && t.completed === taskText.classList.contains("completed")));

        updateLocalStorage();
    });

    li.appendChild(taskText);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

// Обновление localStorage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
