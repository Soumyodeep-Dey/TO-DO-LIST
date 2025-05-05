document.addEventListener('DOMContentLoaded', () => {
    const item = document.getElementById("item");
    const toDoBox = document.getElementById("to-do-box");
    const ADD = document.getElementById("add-new-task");

    let todos = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display a task
    const display = (todo) => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        // Add "done" toggle functionality
        li.addEventListener('click', () => {
            todo.completed = !todo.completed;
            li.classList.toggle('done', todo.completed);
            save(); // Save updated state
        });

        // Add delete functionality
        const deleteBtn = document.createElement("i");
        deleteBtn.style.color = 'red'; // Corrected syntax
        deleteBtn.classList.add('fas', 'fa-trash');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the 'done' toggle
            todos = todos.filter(t => t.id !== todo.id);
            save();
            li.remove();
        });

        // Add "edit" functionality
        const editBtn = document.createElement("i");
        editBtn.style.color = 'blue'; // Corrected syntax
        editBtn.classList.add('fas', 'fa-edit');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the 'done' toggle    
            const newText = prompt("Edit the task:", todo.text);
            if (newText !== null) {
                todo.text = newText;
                save();
            }
        });
        
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
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
