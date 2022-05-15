/*
    Start lobal variables
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
        optionBox.appendChild(doneBtn);
        optionBox.appendChild(deleteBtn);

        cardBody.appendChild(optionBox);

        taskCard.appendChild(cardBody);

        taskListContainer.appendChild(taskCard);

        taskListBox.appendChild(taskListContainer);

        newtask.value = "";
    }
}


function doneDelete(e) {

    // make line cross completed task
    if ((e.target.nodeName === "BUTTON" || e.target.nodeName === "I") && (e.target.classList[1] === "btn-primary" || e.target.classList[1] === "bi-check-square")) {
        document.querySelector(`[data-task=${e.target.dataset.task}]`).classList.toggle("text-decoration-line-through");
    }
    // delete task
    else if ((e.target.nodeName === "BUTTON" || e.target.nodeName === "I") && e.target.classList[1] === "btn-danger") {
        e.target.parentNode.parentNode.parentNode.style.display = "none";
    } else if ((e.target.nodeName === "BUTTON" || e.target.nodeName === "I") && e.target.classList[1] === "bi-trash") {
        e.target.parentNode.parentNode.parentNode.parentNode.style.display = "none";
    }
}
/*
    end main functions
*/

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