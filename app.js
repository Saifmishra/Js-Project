manageEventListener();

function manageEventListener(){
    let frm = document.querySelector('#task-form');
    let task = document.querySelector('#task');
    let filterTask = document.querySelector('#filter');
    let clearTask = document.querySelector('.clear-tasks');
// Add Task
    frm.addEventListener('submit', function(e){
        if(task.value == ""){
            alert('Add Task First');
        }else{
            let li = document.createElement('li');
            li.className = 'collection-item';
            li.innerHTML = task.value;
            task.value = "";
            let link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove">';
            li.appendChild(link);
            document.querySelector('.collection').append(li);
        }
        e.preventDefault();
    })

// Remove Task
    let lll = document.querySelector(".collection");

    lll.addEventListener('click', function(e){
        // console.dir(e.target.classList.contains('fa-remove'));
        // e.target.parentElement.classList.contains('delete-item')
        if(e.target.classList.contains('fa-remove')){
            e.target.parentElement.parentElement.remove();
        }
    });

// Filter Task

    filterTask.addEventListener('keyup', function(e){
        let findTask = e.target.value.toLowerCase();
        let allTask = document.querySelectorAll('.collection-item');

        allTask.forEach(function (task) {
            if(task.textContent.toLowerCase().indexOf(findTask) != -1){
                task.style.display = 'block';
            } else{
                task.style.display = 'none';
            }
        })


    })

}
