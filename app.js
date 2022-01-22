manageEventListener();

function manageEventListener(){
    let frm = document.querySelector('#task-form');
    let task = document.querySelector('#task');
    let date = document.querySelector('#date');
    let filterTask = document.querySelector('#filter');
    let clearTask = document.querySelector('.clear-tasks');


// Add Future Task

    // futureFrm.addEventListener('submit', function(e){

    //     console.dir(date.value);
    //     console.dir(futureTask.value);
    //     let d = date.value;
    //    if( '' == d || '' == futureTask.value){
    //        alert('Please Add Future Task add Date First');
    //    } else{
    //         alert('Future Task Added Successfully');
    //         e.preventDefault();
    //    }
        
    // });

// Add Task

if(date === date.value){
    console.log('You Have a notification');
};
 let d = new Date();
 let v = d.getFullYear() + "-" + d.getMonth()+1 + "-" + d.getDate();;
console.log(v);
    frm.addEventListener('submit', function(e){

        console.log(date.value);
        
        if(task.value == "" || date.value == ''){
            alert('Add Task and Date Properly');
        } else {
            let li = document.createElement('li');
            li.className = 'collection-item';
            li.innerHTML = task.value;
            savedata(task.value);
            task.value = "";
            let link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove">';
            li.appendChild(link);
            document.querySelector('.collection').append(li);
            e.preventDefault();
        } 
    });

// Show value in front End
  document.addEventListener('DOMContentLoaded', showVal)
    function showVal(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function (task) {
            let li = document.createElement('li');
            li.className = 'collection-item';
            li.innerHTML = task;
          
            let link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove">';
            li.appendChild(link);
            document.querySelector('.collection').append(li);  
        })
      
    }

// Save task to local Storage
    function savedata(task){
        let tasks;
        if(null === localStorage.getItem('tasks')){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

// Remove Task
    let lll = document.querySelector(".collection");
    lll.addEventListener('click', function(e){
        // console.log(e.target.parentElement.parentElement.textContent);
        let val = e.target.parentElement.parentElement.textContent;
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.splice(val, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
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

// Clear Task
    let allTask = document.querySelector(".collection");
    clearTask.addEventListener('click', function(){
        allTask.innerHTML = "";
        localStorage.clear();
    });

  
}
