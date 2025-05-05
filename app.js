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
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "15px";
        buttonContainer.style.padding = "5px";

        // Add "done" toggle functionality
        li.addEventListener('click', () => {
            todo.completed = !todo.completed;
            li.classList.toggle('done', todo.completed);
            save();
        });

        // Add delete functionality
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.style.background = 'none';
        deleteBtn.style.border = 'none';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.color = 'red';
        deleteBtn.style.fontSize = '16px';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            todos = todos.filter(t => t.id !== todo.id);
            save();
            li.remove();
        });

        // Add "edit" functionality
        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.style.background = 'none';
        editBtn.style.border = 'none';
        editBtn.style.cursor = 'pointer';
        editBtn.style.color = 'blue';
        editBtn.style.fontSize = '16px';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newText = prompt("Edit the task:", todo.text);
            if (newText !== null && newText.trim() !== "") {
                todo.text = newText;
                textSpan.textContent = newText;
                save();
            }
        });

        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);
        li.appendChild(buttonContainer);
        toDoBox.appendChild(li);

        // Apply "done" class if task is completed
        if (todo.completed) {
            li.classList.add('done');
        }
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
