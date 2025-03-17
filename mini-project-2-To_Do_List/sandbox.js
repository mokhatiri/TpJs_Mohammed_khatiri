// the function responsible for adding a task
function addTask(task){
    // add to the ul class = "todos"
    // create a li
    /*
    of the form:
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    */
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    `;
    document.querySelector('.todos').appendChild(li);

    // Clear the input
    clearInput();

    // highlilight the task for 1 second
    let currBG = li.style.backgroundColor;
    li.style.backgroundColor = 'lightgreen';

    // Smoothly fade back to normal background
    setTimeout(() => {
        li.style.transition = "background-color 1.5s ease-in-out"; // Smooth transition
        li.style.backgroundColor = currBG; // Fade effect
        }, 100);

}

// function to clear the input
function clearInput(){
    // clear the input of name = "add"
    document.querySelector('input[name="add"]').value = '';
}

// function to remove a task
function removeTask(e){
    // check if the target is the delete icon firt (to make sure)
    if(e.target.classList.contains('delete')){
        // remove the parent element (the li)
        e.target.parentElement.remove();
    }
}

// function to show only the tasks that match the search
function showTasks(text){
    // loop through the li elements
    let lis = document.querySelectorAll('.list-group-item')
    for(let i = 0; i < lis.length; i++){
        // get the text of the li
        const taskText = lis[i].textContent.toLowerCase();

        // check if the text contains the search text using the includes method
        if(taskText.includes(text)){
            // show the li overwting the display property
            lis[i].style.setProperty('display', 'flex', 'important');
        }else{
            // hide the li
            lis[i].style.setProperty('display', 'none', 'important');
        }
    };
}

// Event listeners

// prevent the page from reloading when the form is submitted
document.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents any form from reloading the page
});


// Event listener for the add input
document.querySelector('.add').addEventListener('submit', function(e) {
// clear the search input too and showtaks
    document.querySelector('.search input').value = '';
    showTasks('');

    // Get the value of the input
    const task = document.querySelector('input[name="add"]').value;
    // Add the task to the list
    addTask(task);
});

// Event listener for the remove icon
document.querySelector('.todos').addEventListener('click', function(e) {
    removeTask(e);
});

// Event listener for the search input (also prevent the page from reloading)
document.querySelector('.search input').addEventListener('keyup', function(e) {
    // call the showTasks function
    showTasks(e.target.value.toLowerCase());
});

// another choice is to store the tasks in a json file and load them when the page is loaded
// this works without the need for preventing the page from reloading as the reload is much better for the user experience
// and it is more efficient as the tasks are loaded only once
// but we stick to this choice for now as it is simpler and more straightforward