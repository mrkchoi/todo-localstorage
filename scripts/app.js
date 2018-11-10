// DOM Variables

let userName = document.querySelector('.header__title--name');

// Inputs
let inputForm = document.querySelector('.add__form');
let inputInfo = document.querySelector('#add__task--info');
let inputDate = document.querySelector('#add__task--date');
let inputInfoDue = document.querySelector('.task__subtitle--due');
let taskTitle = document.querySelectorAll('.task__title');

// Task counter
let taskCount = document.querySelector('.header__subtitle--number');

// Task List
let tasks = document.querySelector('.task__list');
let taskList = JSON.parse(localStorage.getItem('tasks')) || [];


// // Show users name in header
    if(!localStorage.getItem('name')) {
        // Name prompt
        let namePrompt = prompt("Please enter your name...");
        userName.textContent = ` ${namePrompt}`;

        // Name input prompt only if no local storage value
        if(namePrompt !== '') {
            localStorage.setItem('name', JSON.stringify(namePrompt));
        }
        
    } else {
        let namePrompt = JSON.parse(localStorage.getItem('name'));
        userName.textContent = ` ${namePrompt}`;
    }

window.addEventListener('DOMContentLoaded', populateTasks);

// Form event listener
inputForm.addEventListener('submit', newTask);
// Task list delete event listener
tasks.addEventListener('click', deleteTask);

// New task function
function newTask(e) {
    let taskInfo = inputInfo.value;
    let taskDate = inputDate.value;

    taskList.push({
        task: taskInfo,
        dueDate: taskDate || `soon`,
        done: false
    })
    localStorage.setItem('tasks', JSON.stringify(taskList));
    
    populateTasks(tasks, taskList);    

    e.preventDefault();
    this.reset();
}

function populateTasks(taskList = [], tasks) {
    tasks.innerHTML = taskList.map((task, i) => {
        return `
        <div class="task__item">
            <div class="task__content">
                <h5 class="task__title task__title--${i}">${task.task}</h5>
                <p class="task__subtitle">Due ${task.dueDate}</p>
            </div>
            <div class="task__checkbox--wrapper">
                <form class="task__form">
                    <input class="task__checkbox" type="checkbox" data-index=${i}>
                </form>
            </div>
        </div>
    `;
    }).join('');

    taskCount.textContent = `${taskList.length}`;
}
populateTasks(taskList, tasks);

function deleteTask(e) {
    let index = e.target.dataset.index;
    let taskTitle = document.querySelectorAll('.task__title');
    taskTitle.forEach(title => {
        if(title.classList.contains(`task__title--${index}`)) {
            title.classList.add('checked');
        }
    });
    


    setTimeout(() => {
        let index = e.target.dataset.index;

        if(!e.target.matches('input')) {
            return;
        }
        taskList[index].done = !taskList[index].done;
    
        taskList.splice(index,1);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        tasks.innerHTML = taskList.map((task, i) => {
            return `
            <div class="task__item">
                <div class="task__content">
                    <h5 class="task__title task__title--${i}">${task.task}</h5>
                    <p class="task__subtitle">Due ${task.dueDate}</p>
                </div>
                <div class="task__checkbox--wrapper">
                    <form class="task__form">
                        <input class="task__checkbox" type="checkbox" data-index=${i}>
                    </form>
                </div>
            </div>
        `;
        }).join('');
        taskCount.textContent = `${taskList.length}`;
    }, 1000);
   
}



// Fix map error



