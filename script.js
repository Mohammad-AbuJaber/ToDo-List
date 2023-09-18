const API_URL = 'https://dummyjson.com/todos';

if (localStorage.getItem('lastID') === null) {
    localStorage.setItem('lastID', '0');
}

class ToDo {
    constructor(id, description, status, userId) {
        this.id = id;
        this.todo = description;
        this.completed = status;
        this.userId = userId;
    }

    async fetchAndDisplayTasks() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if (!data || !data.todos || !Array.isArray(data.todos)) {
                throw new Error('Invalid data received from the API');
            }

            const todoList = data.todos.map(todoData => {
                return new ToDo(
                    todoData.id,
                    todoData.todo,
                    todoData.completed,
                    todoData.userId
                );
            });

            localStorage.setItem('todoList', JSON.stringify(todoList));
            const lastID = Math.max(...todoList.map(todo => todo.id));
            localStorage.setItem('lastID', lastID.toString());
            console.log(todoList);
            this.loadTodoListInTable(todoList);
        } catch (error) {
            console.error('Error fetching and storing ToDo list:', error);
            throw error;
        }
    }

    loadTodoListInTable(todoList) {
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

    toggleStatus(id) {
        // Implement toggleStatus functionality
    }

    deleteTask(id) {
        // Implement deleteTask functionality
    }
}

async function fetchDataAndDisplay() {
    const todoInstance = new ToDo();
    try {
        await todoInstance.fetchAndDisplayTasks();
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDataAndDisplay().then(() => {
    console.log("ToDo list fetched and stored successfully!");
});
