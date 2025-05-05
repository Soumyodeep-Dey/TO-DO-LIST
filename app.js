document.addEventListener('DOMContentLoaded', () => {
    const item = document.getElementById("item");
    const toDoBox = document.getElementById("to-do-box");
    const ADD = document.getElementById("add-new-task");

    let todos = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display a task
    const display = (todo) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.justifyContent = "space-between";

        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;
        li.appendChild(textSpan);

        // Create a container for buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Add delete functionality
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the click event on <li>
            todos = todos.filter((t) => t.id !== todo.id);
            save();
            li.remove();
        });

        // Add "edit" functionality
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the click event on <li>
            const newText = prompt("Edit the task:", todo.text);
            if (newText !== null && newText.trim() !== "") {
                todo.text = newText;
                textSpan.textContent = newText;
                save();
            }
        });

        // Add a separator between buttons
        const separator = document.createElement("span");
        separator.textContent = "|";
        separator.classList.add("button-separator");

        // Append buttons and separator to the container
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(separator);
        buttonContainer.appendChild(deleteBtn);
        li.appendChild(buttonContainer);

        // Apply "done" class if task is completed
        if (todo.completed) {
            li.classList.add('done');
        }

        // Add toggle functionality for marking a task as completed
        li.addEventListener("click", () => {
            todo.completed = !todo.completed; // Toggle the completed status
            li.classList.toggle("done"); // Toggle the "done" class
            save(); // Save the updated tasks to localStorage
        });

        toDoBox.appendChild(li);
    };

    // Display existing todos on page load
    todos.forEach(todo => {
        display(todo);
    });

    // Add a new task
    ADD.addEventListener('click', () => {
        const TaskText = item.value.trim();

        if (TaskText === "") return; // Prevent empty tasks

        const NewTask = {
            id: Date.now(),
            text: TaskText,
            completed: false
        };

        todos.push(NewTask);
        save(); // Save tasks to localStorage
        item.value = ""; // Clear input field
        display(NewTask); // Display the new task
    });

    // Save tasks to localStorage
    const save = () => {
        localStorage.setItem('tasks', JSON.stringify(todos));
    };
});
