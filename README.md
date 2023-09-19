# TODO List

This repository contains a simple Todo application that allows users to manage their tasks. The application implements
the following features:

1. **Retrieve TODO list from a dummy API:**
    - Fetches the initial TODO list from the provided dummy API endpoint [here](https://dummyjson.com/todos) using
      JavaScript.
    - Displays the retrieved TODO list on the webpage.

2. **Add new TODO:**
    - Implements a form or input field where users can add new TODOs.
    - Validates the user input to ensure empty tasks are not added.
    - Upon submission, adds the new TODO to the TODO list displayed on the webpage.

3. **Delete TODO:**
    - For each TODO item, adds a delete button that allows users to remove a task.
    - Implements the functionality to delete the selected task when the delete button is clicked.

4. **Mark TODO as done:**
    - Adds a checkbox or button to mark a task as done.
    - Implements the functionality to update the status of a task when marked as done.
    - Applies a visual indication to distinguish between completed and pending tasks.

5. **Count the number of TODOs in the footer:**
    - Calculates the total number of TODOs in the list.
    - Displays the count in the footer of the webpage.

6. **Delete TODO confirmation:**
    - When the user clicks the delete button, displays a confirmation dialog.
    - Asks the user to confirm or cancel the delete action before removing the task.

7. **Search for TODOs:**
    - Implements a search bar that allows users to search for specific tasks.
    - Filters the TODO list based on the search input and displays the matching tasks.

8. **Data storage in the browser:**
    - Uses browser storage mechanisms like LocalStorage or SessionStorage.
    - Stores the TODO list data in the browser to persist it across page refreshes.

9. **Additional Challenge - Inline Edit:**
    - Allows users to edit the content of a task directly on the list (inline editing).
    - Implements the functionality to update a task's content and save the changes.

## Instructions

Follow these instructions to set up and run the TODO List locally:

1. Clone the repository: `git clone https://github.com/Mohammad-AbuJaber/ToDo-List`
2. Navigate to the project directory: `cd ToDo-List`
3. Open the `index.html` file in a web browser to use the application.

Note: you can also use this [live demo](https://mohammad-abujaber.github.io/ToDo-List/) of the page.

## General Guidelines

- Uses HTML, CSS, and JavaScript to build the application.
- Implements responsive design to ensure the application works well on different screen sizes.
- Uses asynchronous JavaScript methods (e.g., Fetch API, async/await) for API interactions.
