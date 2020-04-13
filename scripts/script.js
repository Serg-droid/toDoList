const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    todoContainer = document.querySelector('.todo-container');

const todoData = [];

// Получение данных из localStorage
const getLocalStorageData = function() {
    for (let i = 0; i < localStorage.length; i++) {
        const value = localStorage.key(i);
        let completed = localStorage.getItem(value);
        switch (completed) {
            case 'true':
                completed = true;
                break;
            default:
                completed = false;
                break;
        }
        todoData.push({
            value,
            completed,
        });
    }
};

const showNewList = function(list) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `<span class="text-todo">${list.value}</span>` + 
    `<div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
    </div>`;

    if (list.completed) {
        todoCompleted.append(li);
    } else {
        todoList.append(li);
    }

    // Навешиваем обработчик изменения состояния элемента
    const btnTodoCompleted = li.querySelector('.todo-complete');

    btnTodoCompleted.addEventListener('click', function() {
        list.completed = !list.completed;
        localStorage.setItem(`${list.value}`, `${list.completed}`);
        li.remove();
        showNewList(list);
    });

    // Навешиваем обрбаотчик удаления 
    const removeTodoTask = li.querySelector('.todo-remove');

    removeTodoTask.addEventListener('click', function() {
        li.remove();
        todoData.splice([todoData.indexOf(list)], 1);
        localStorage.removeItem(`${list.value}`, `${list.completed}`)
    });

};

// Выводит все задачи из массива 
const showAllLists = function() {

    todoData.forEach(function(item) {
        showNewList(item);
    });
   
};

// Добавление задачи из формы
todoControl.addEventListener('submit', function(e) {
    e.preventDefault();

    if (headerInput.value === '') {
        alert('Нельзя добавить пустую задачу');
        return;
    }
    const newTodo = {
        value: headerInput.value,
        completed: false,
    }

    todoData.push(newTodo);
    localStorage.setItem(`${newTodo.value}`, `${newTodo.completed}`);
    showNewList(newTodo);

    headerInput.value = '';
});

getLocalStorageData();
showAllLists();
