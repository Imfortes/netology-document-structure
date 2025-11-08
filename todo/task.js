document.addEventListener("DOMContentLoaded", () => {
    const tasksList = document.querySelector("#tasks__list");
    const tasksAdd = document.querySelector("#tasks__add");

    let tasks = [];
    try {
        const stored = localStorage.getItem("tasks");
        if (stored) {
            tasks = JSON.parse(stored);
            if (!Array.isArray(tasks)) {
                tasks = [];
            }
        }
    } catch (e) {
        console.error("Ошибка при чтении задач из localStorage:", e);
        tasks = [];
    }

    function loadTasks() {
        tasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task', 'fade-in');
            taskElement.dataset.id = index;

            taskElement.innerHTML = `
                <div class="task__title">
                    ${task}
                </div>
                <a href="#" class="task__remove">&times;</a>
            `;

            tasksList.appendChild(taskElement);
        });
    }

    function handleAddTask() {
        const taskInput = document.querySelector("#task__input");
        const taskText = taskInput.value.trim();

        if (taskText === '') return;

        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
        taskInput.value = "";
    }

    function handleRemoveTask(taskId) {
        tasks.splice(taskId, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }

    tasksAdd.addEventListener("click", (e) => {
        e.preventDefault();
        handleAddTask()
    })

    const taskInput = document.querySelector("#task__input");
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        }
    });

    tasksList.addEventListener("click", (e) => {
        if (e.target.classList.contains('task__remove')) {
            e.preventDefault();

            const taskElement = e.target.closest('.task');
            const taskId = parseInt(taskElement.dataset.id, 10);

            taskElement.classList.add('fade-out');

            setTimeout(() => {
                handleRemoveTask(taskId);
            }, 700);

        }
    })
})