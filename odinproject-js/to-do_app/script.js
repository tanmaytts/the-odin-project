task_array = [];
btn = document.getElementById("button");
function task(name, discription, date, priority, category, status) {
    this.name = name;
    this.discription = discription;
    this.date = date;
    this.priority = priority;
    this.category = category;
    this.status = status;
}


btn.addEventListener("click", () => {
    let name = document.getElementById("main_name").value;
    let discription = document.getElementById("description_area").value;

    let el = document.querySelector('input[type="date"]');

    let date = el.value;

    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;
    let status = document.getElementById("status").value;

    let newtask = new task(name, discription, date, priority, category, status);

    task_array.push(newtask);

    create_task(task_array.length - 1);
});

function create_task(index) {
    let task = task_array[index];
    let task_div = document.createElement("div");
    task_div.classList.add("task_div");
    task_div.dataset.priority = (task.priority || "none").toLowerCase();

    let priorityLabel = task.priority ? task.priority : "No priority";

    task_div.innerHTML = `<h2>${task.name}</h2>
                          ${task.discription ? `<p class="desc">${task.discription}</p>` : ""}
                          ${task.date ? `<p class="due">📅 ${task.date}</p>` : ""}
                          <div class="badges">
                            <span class="badge badge-priority">${priorityLabel}</span>
                            <span class="badge badge-category">${task.category}</span>
                            <span class="badge badge-status">${task.status}</span>
                          </div>
                          <button class="delete_button">Delete</button>`;

        task_div.querySelector(".delete_button").addEventListener("click", () => {
        let idx = task_array.indexOf(task);   // find current position
        if (idx !== -1) task_array.splice(idx, 1);
        task_div.remove();                     // remove this row directly
    });
    document.getElementById("tasks").appendChild(task_div);
}
