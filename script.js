const API_URL = 'https://dummyjson.com/todos';

class ToDo {
    constructor(id, description, status, userId) {
        this.id = id;
        this.todo = description;
        this.completed = status;
        this.userId = userId;
    }

    static loadTodoListInTable(todoList) {
        const tableBody = document.getElementById('taskList');
        tableBody.innerHTML = '';

        todoList.forEach(todo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${todo.id}</td>
                <td>${todo.todo}</td>
                <td>${todo.userId}</td>
                <td>${todo.completed ? 'Completed' : 'Pending'}</td>
                <td>
                    <button class="btn" onclick="toggleStatus(${todo.id})">Toggle Status</button>
                    <button class="btn btn-delete" onclick="deleteTask(${todo.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    static getStoredTodoList() {
        const storedTodoList = localStorage.getItem('todoList');
        return storedTodoList ? JSON.parse(storedTodoList) : [];
    }

    static updateTodoListInStorage(updatedTodoList) {
        localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    }

    static addTask() {
        const description = document.getElementById('taskDescription').value;
        if (description) {
            const todoList = ToDo.getStoredTodoList();
            const lastId = findLastId();
            const newTodo = new ToDo(
                lastId + 1,
                description,
                false,
                1
            );
            todoList.push(newTodo);
            ToDo.updateTodoListInStorage(todoList);
            ToDo.loadTodoListInTable(todoList);
            document.getElementById('taskDescription').value = '';
        } else {
            alert('Please Enter the Description');
        }
    }
}

async function fetchDataAndDisplay() {
    try {
        let todoList = ToDo.getStoredTodoList();

        if (todoList.length === 0) {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!data || !data.todos || !Array.isArray(data.todos)) {
                throw new Error('Invalid data received from the API');
            }

            todoList = data.todos.map(todoData => new ToDo(
                todoData.id,
                todoData.todo,
                todoData.completed,
                todoData.userId
            ));

            ToDo.updateTodoListInStorage(todoList);
        }

        console.log(todoList);
        ToDo.loadTodoListInTable(todoList);
    } catch (error) {
        console.error('Error:', error);
    }
}

function toggleStatus(id) {
    const todoList = ToDo.getStoredTodoList().map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });

    ToDo.updateTodoListInStorage(todoList);
    ToDo.loadTodoListInTable(todoList);
}

function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    const todoList = ToDo.getStoredTodoList().filter(todo => todo.id !== id);

    ToDo.updateTodoListInStorage(todoList);
    ToDo.loadTodoListInTable(todoList);
}

const searchBar = document.getElementById("search");
searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    const todoList = ToDo.getStoredTodoList().filter(todo => {
        return todo.todo.toLowerCase().includes(searchString);
    });

    ToDo.loadTodoListInTable(todoList);
});

function findLastId() {
    const todoList = ToDo.getStoredTodoList();
    return todoList.length > 0 ? todoList[todoList.length - 1].id : 0;
}

let addButton = document.getElementById('addTaskButton');
addButton.addEventListener('click', ToDo.addTask);

fetchDataAndDisplay().then(() => {
    console.log("ToDo list fetched and stored successfully!");
});
