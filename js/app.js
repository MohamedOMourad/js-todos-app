/*
    Start Global variables
*/

//select the task input to get value
const newtask = document.querySelector(`div input[type="text"]`);

//select add task button
const addTaskBtn = document.querySelector(`#add-task`);

//creat tasks list box
const taskListBox = document.createElement("div");
taskListBox.classList.add("py-5");

//creat tasks list container
const taskListContainer = document.createElement("div");
taskListContainer.classList.add("container");
taskListContainer.innerHTML = `  <div class="card-header text-center h1">Your Tasks </div>`;

// let doneBtn = "";
/*
    end lobal variables
*/

/*
    Start main functions
*/
// add tasks list when click btn or press enter
function taskList() {
    if (newtask.value !== "") {
        //creat task card
        const taskCard = document.createElement("div");

        taskCard.classList.add("card");

        //creat task card body
        const cardBody = document.createElement("div");

        cardBody.classList.add("card-body", "d-flex", "justify-content-between");

        //add task to card body
        cardBody.innerHTML = `<div class="border pe-5 py-1 text-break" data-task=${newtask.value.split(" ").join("")}><i class="bi bi-caret-right"></i> ${newtask.value}</div>`;

        // creat done  button
        const doneBtn = document.createElement("button");
        doneBtn.classList.add("btn", "btn-primary", "mx-1");
        doneBtn.setAttribute("data-task", newtask.value.split(" ").join(""));
        doneBtn.innerHTML = `<i class="bi bi-check-square" data-task=${newtask.value.split(" ").join("")}></i>`;

        // creat delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger", "m-1");
        deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;

        // create option box
        const optionBox = document.createElement("div");

        //add done btn
        optionBox.appendChild(doneBtn);

        //add delte btn
        optionBox.appendChild(deleteBtn);

        cardBody.appendChild(optionBox);

        taskCard.appendChild(cardBody);

        taskListContainer.appendChild(taskCard);

        taskListBox.appendChild(taskListContainer);

        //add to local storage
        svaetoLocalStorgae(newtask.value);

        //clear the input
        newtask.value = "";
    }
}


function doneDelete(e) {

    // make cross line on completed task
    if ((e.target.nodeName === "BUTTON" || e.target.nodeName === "I") && (e.target.classList[1] === "btn-primary" || e.target.classList[1] === "bi-check-square")) {
        //get the target task by data set
        document.querySelector(`[data-task=${e.target.dataset.task}]`).classList.toggle("text-decoration-line-through");
    }
    // delete task and make the butn and the icon active with the event
    else if ((e.target.nodeName === "BUTTON" || e.target.nodeName === "I") && e.target.classList[1] === "btn-danger") {
        e.target.parentNode.parentNode.parentNode.style.display = "none";

        //delte the target taks from the storage by getin it's index
        deletFromLocalStorage(e.target.parentNode.children[0].dataset.task);

    } else if ((e.target.nodeName === "BUTTON" || e.target.nodeName === "I") && e.target.classList[1] === "bi-trash") {
        e.target.parentNode.parentNode.parentNode.parentNode.style.display = "none";

        //delte the target taks from the storage by getin it's index
        deletFromLocalStorage(e.target.parentNode.parentNode.children[0].dataset.task);
    }
}

// add and update new tasks to local storage
function svaetoLocalStorgae(task) {
    let taskList = checkLocalStorage();
    taskList.push(task);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

//check local storage empty or not
function checkLocalStorage() {
    let taskList;
    if (localStorage.getItem("taskList") === null) {
        return taskList = [];
    } else {
        return taskList = JSON.parse(localStorage.getItem("taskList"));
    }
}

//add saved tasks to todoList from local storage
function getSavedTasks() {
    let taskList = checkLocalStorage();
    taskList.forEach((task) => {
        if (task !== "") {
            //creat task card
            const taskCard = document.createElement("div");

            taskCard.classList.add("card");

            //creat task card body
            const cardBody = document.createElement("div");

            cardBody.classList.add("card-body", "d-flex", "justify-content-between");

            //add task to card body
            cardBody.innerHTML = `<div class="border pe-5 py-1 text-break" data-task=${task.split(" ").join("")}><i class="bi bi-caret-right"></i> ${task}</div>`;

            // creat done  button
            const doneBtn = document.createElement("button");
            doneBtn.classList.add("btn", "btn-primary", "mx-1");
            doneBtn.setAttribute("data-task", task.split(" ").join(""));
            doneBtn.innerHTML = `<i class="bi bi-check-square" data-task=${task.split(" ").join("")}></i>`;


            // creat delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-danger", "m-1");
            deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;

            // create option box
            const optionBox = document.createElement("div");
            optionBox.appendChild(doneBtn);
            optionBox.appendChild(deleteBtn);

            cardBody.appendChild(optionBox);

            taskCard.appendChild(cardBody);

            taskListContainer.appendChild(taskCard);

            taskListBox.appendChild(taskListContainer);

        }
    })
}

//delet tasks from local storage
function deletFromLocalStorage(task) {
    let taskList = checkLocalStorage();
    //delte the target taks from the storage by getin it's index
    taskList.splice(taskList.indexOf("task"), 1);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}
/*
    end main functions
*/

/* 
    start Main Events
*/

document.addEventListener("DOMContentLoaded", getSavedTasks)
    // add tasks list when click btn 
addTaskBtn.addEventListener("click", taskList);

// add tasks list when press enter
document.body.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        taskList();
    }
});

document.body.appendChild(taskListBox);

//mark as complete task by add line across the words
taskListBox.addEventListener("click", doneDelete);

/* 
    start Main Events
*/