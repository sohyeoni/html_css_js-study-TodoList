const inputBox = document.querySelector(".inputBox input");
const addBtn = document.querySelector(".inputBox button");
const todoList = document.querySelector(".todoList");
const delAllBtn = document.querySelector(".footer button");

// task 추가 버튼 활성화/비활성화
inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if(userData.trim() != 0) {
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active");
    }
}

showTasks();

addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArray = [];
    }else{
        listArray = JSON.parse(getLocalStorage);
    }
    listArray.push({task: userData, status: 0});
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    addBtn.classList.remove("active");
    showTasks();
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if(getLocalStorage == null){
        listArray = [];
    }else{
        listArray = JSON.parse(getLocalStorage);
    }
    let newLiTag = '';
    let completeCount = 0;
    listArray.forEach((element, index) => {
        let statusIconTag = '';
        let statusdecoTag = '';
        if(element.status == 0){
            statusIconTag = "far fa-circle";
        }else{
            statusIconTag = "far fa-check-circle ";
            statusdecoTag = "complete";
            completeCount += 1;
        }
        newLiTag += `<li><span class="statusButton" onclick="statusChangeTask(${index})";><i class="${statusIconTag+statusdecoTag}"></i></span>
            <span id="task" class="${statusdecoTag}">${element.task}</span><span class="delButton" onclick="delTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });

    todoList.innerHTML = newLiTag;
    inputBox.value = "";

    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArray.length - completeCount;
    if(listArray.length != 0){
        delAllBtn.classList.add("active");
    }else{
        delAllBtn.classList.remove("active");
    }
}

function delTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorage);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

function statusChangeTask(index){
    let statusBtn = document.querySelectorAll(".todoList li span.statusButton i");
    let getLocalStorage = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorage);
    if(listArray[index].status == 0){
        statusBtn[index].classList.remove("fa-circle");
        statusBtn[index].classList.add("fa-check-circle", "complete");
        listArray[index].status = 1;
    }else{
        statusBtn[index].classList.remove("fa-check-circle", "complete");
        statusBtn[index].classList.add("fa-circle");
        listArray[index].status = 0;
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}

delAllBtn.onclick = ()=>{
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}