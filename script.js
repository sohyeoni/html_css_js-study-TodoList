const inputBox = document.querySelector(".inputBox input");
const addBtn = document.querySelector(".inputBox button");
const todoList = document.querySelector(".todoList");
const delAllBtn = document.querySelector(".footer button");

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
    listArray.push(userData);
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
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="delTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";

    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArray.length;
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

delAllBtn.onclick = ()=>{
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks();
}