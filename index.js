

let todoInput =document.querySelector(".input");

let addTodoButton =document.querySelector(".button");

let showTodos = document.querySelector(".todos-container");

let todo ;

let localData = JSON.parse(localStorage.getItem('data'));

let todoList = localData || [];

function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(param){

        var number = Math.random()*16 | 0;

        var randomNumber = param =='x'? number:(number & 0x3 | 0x8);

        return randomNumber.toString(16);
    })

}

addTodoButton.addEventListener("click",(event)=>{
    event.preventDefault();
    todo = todoInput.value;
    if(todo.length > 0)
    {
        todoList.push({
            id:uuid(),
            todo,
            isCompleted:false 
        });
        renderTodoList(todoList);
        localStorage.setItem('data',JSON.stringify(todoList));
        todoInput.value="";
    }
    

});

showTodos.addEventListener('click',(event)=>{
    let key = event.target.dataset.key;
    let Delkey = event.target.dataset.todokey;
    todoList = todoList.map((todo)=>todo.id === key?{...todo,isCompleted: !todo.isCompleted}: todo);
    todoList = todoList.filter((todo)=> todo.id !== Delkey);
    localStorage.setItem('data',JSON.stringify(todoList))
    renderTodoList(todoList);
    
    
    
})

function renderTodoList(todoList){
      
      /* Destructuring object concept */
    showTodos.innerHTML = todoList.map(({id,todo,isCompleted})=>
    `<div class=" todo relative ">
    <input 
    id="item-${id}" 
    type="checkbox" 
    class="t-checkbox"
    data-key=${id}
    ${isCompleted ? "checked":""}> 
    <label 
    for="item-${id}" 
    class="label 
    todo-text 
    t-pointer ${isCompleted ? "checked-todo":""}" data-key=${id}>
    ${todo}
    </label>
    <button class="button cursor absolute right-0 ">
    <span data-todokey=${id} class="btn-Del material-icons-outlined ">
    delete
    </span>
    </button>
    </div>`)

}


renderTodoList(todoList);
