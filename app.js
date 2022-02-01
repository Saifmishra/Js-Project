manageEventListener();
function manageEventListener(){
    let frm = document.querySelector('#task-form');
    let task = document.querySelector('#task');
    let date = document.querySelector('#date');
    let filterTask = document.querySelector('#filter');
    let clearTask = document.querySelector('.clear-tasks');
    let notificationBar = document.querySelector('#notification');
    let notificationElement = document.querySelector('.notificationElement');


    // Show and Close Notification 
    notificationBar.addEventListener('click', function(e){
        notificationElement.removeAttribute('hidden');
        if(e.target.className == "item"){
            console.log(e.target);
            e.target.remove();
            let yyy = document.getElementById('num').innerHTML;
            console.log(typeof parseInt(yyy));
            document.getElementById('num').innerHTML = yyy - 1;
        }
    });

    //todays Date (v is todays here)
    let d = new Date();
    let justDate =  d.getDate().toString();
    let justMOnth =  (d.getMonth()+1).toString();
    justDate = justDate.length != 1 ? justDate : "0" + justDate;
    justMOnth = justMOnth.length != 1 ? justMOnth : "0" + justMOnth;
    let v = d.getFullYear() + "-" + justMOnth + "-" + justDate;
    console.log(v);

    // Show Notification
    showNotification();
    function showNotification(){
        let nofy = [];
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.forEach(function (task) {
            if(task.indexOf(v) != -1){
                nofy.push(task);   
            }
        });
        let res =nofy.length;
        document.querySelector('#num').innerHTML = res;
        let li = document.createElement('li');
        nofy.forEach(function(val){
            notificationElement.innerHTML += `<li class = "item"> ${val} <a href="#" class="complete"><i class="fa fa-check-circle" aria-hidden="true"></i></a></li>`;
        });
    }


    // Add Task
    frm.addEventListener('submit', function(e){
        console.log(task.value);
        console.log(date.value);
        if(task.value == "" || date.value == ''){
            alert('Add Task and Date Properly');
        } else {
            let li = document.createElement('li');
            li.className = 'collection-item';
            li.innerHTML = task.value;
            let finalV = task.value + "(" +date.value + ")";
            li.innerHTML = finalV;
            savedata(finalV);
            task.value = "";
            date.value = "";
            let link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove">';
            li.appendChild(link);
            document.querySelector('.collection').append(li);
            location.reload();
            e.preventDefault();
        } 
    });

// Show value in front End
    document.addEventListener('DOMContentLoaded', showVal);
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
            location.reload();
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
    });

    // Clear Task
    let allTask = document.querySelector(".collection");
    clearTask.addEventListener('click', function(){
        allTask.innerHTML = "";
        localStorage.clear();
    });
}
