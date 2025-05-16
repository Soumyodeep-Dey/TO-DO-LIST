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
            e.stopPropagation();
            todos = todos.filter((t) => t.id !== todo.id);
            save();
            li.remove();
        });

        // Add "edit" functionality
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (todo.completed) return;

            // Create input field and replace the span
            const input = document.createElement("input");
            input.type = "text";
            input.value = todo.text;
            input.style.flex = "1";
            li.replaceChild(input, textSpan);
            input.focus();

            // Save changes on blur or Enter key
            const saveEdit = () => {
                const newText = input.value.trim();
                if (newText) {
                    todo.text = newText;
                    textSpan.textContent = newText;
                    save();
                }
                li.replaceChild(textSpan, input); // Restore the span
            };

            input.addEventListener("blur", saveEdit);
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    saveEdit();
                }
            });
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

            // Disable edit button if completed, enable if not
            if (todo.completed) {
                editBtn.disabled = true;
                editBtn.classList.add("disabled");
            } else {
                editBtn.disabled = false;
                editBtn.classList.remove("disabled");
            }

            save(); // Save the updated tasks to localStorage
        });


        toDoBox.appendChild(li);
    };

    // Display existing todos on page load
    todos.forEach(todo => {
        display(todo);
    });

    // Function to add a new task
    function addTask() {
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
    }

    // Add task on button click
    ADD.addEventListener('click', addTask);

    // Add task on Enter key press
    item.addEventListener('keydown', (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Save tasks to localStorage
    function save() {
        localStorage.setItem('tasks', JSON.stringify(todos));
    }
});
