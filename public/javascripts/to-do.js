const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");
let editingIndex = -1;

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
    todo = [];
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const storedEntries = localStorage.getItem('todo-list');

    if (storedEntries) {
        if (index !== null) {
            populateFormFields(index);
        } else {
            ReadToDoItems();
        }
    }
};

function CreateToDoItems() {
    if (todoValue.value === "") {
        todoAlert.innerText = "Please enter your todo text!";
        todoValue.focus();
    } else {
        let IsPresent = false;
        let editingIndex = -1;
     console.log(window.location.search)
        // Check if the item is already present and get its index
        todo.forEach((element, index) => {
            if (element.item === todoValue.value) {
                IsPresent = true;
                editingIndex = index;
            }
        });
        if (IsPresent) {
            // Update the existing item
            todo[editingIndex].item = todoValue.value; // Update the item text
            todo[editingIndex].status = false; // Assuming you want to reset the status
            setLocalStorage();
    
            // Update the displayed list item
            const existingListItem = listItems.children[editingIndex];
            existingListItem.querySelector('div').innerText = todoValue.value;
    
            return;
        }
        
        // if(editingIndex !== -1){
        //     const note = todo[editingIndex];
        //     const updatedNote = todoValue;
        //     note .item = updatedNote.value;
        //     localStorage.setItem("todo-list", JSON.stringify(todo));
        //     todoValue.value = "";
        //     editingIndex = -1;
        //     displayNotes();
        // }

        if (IsPresent) {
            // Update the existing item
            todo[editingIndex].status = false; // Assuming you want to reset the status
            setLocalStorage();
            return;
        }

        let li = document.createElement("li");
        const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
              <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/edit.jpg" />
              <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.jpg" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);

        if (!todo) {
            todo = [];
        }

        let itemList = { item: todoValue.value, status: false };
        todo.push(itemList);
        setLocalStorage();
    }
    todoValue.value = "";
    // setAlertMessage("Todo item Created Successfully!");
    window.location.replace("/welcome/viewto-do");
}


function ReadToDoItems() {
    todo.forEach((element) => {
        let li = document.createElement("li");
        let style = "";
        if (element.status) {
            style = "style='text-decoration: line-through'";
        }
        const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
            element.item
            }
${
            style === ""
                ? ""
                : '<img class="todo-controls" src="/images/check.jpeg" />'
        }</div><div>
${
            style === ""
                ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/images/edit.jpg" />'
                : ""
        }
<img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/images/delete.jpg" /></div></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

function UpdateToDoItems(element) {
    console.log(element);
    const index = Array.from(element.parentElement.parentElement.parentElement.children).indexOf(element.parentElement.parentElement);
    //element.parentElement.parentElement.remove();
    console.log(index);
   window.location.replace(`/welcome/todo?index=${index}`);
}

function populateFormFields(index) {
    const userEntries = JSON.parse(localStorage.getItem('todo-list'));
    const singleUserData = userEntries[index];
    document.getElementById('todoText').value = singleUserData.item;
    editingIndex = index;
    
}

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message) {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message;
    setTimeout(() => {
        todoAlert.classList.add("toggleMe");
    }, 1000);
}

function DeleteToDoItems(element) {
    let deleteValue =
        element.parentElement.parentElement.querySelector("div").innerText;

   // if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
        element.parentElement.parentElement.setAttribute("class", "deleted-item");

        todo.forEach((element) => {
            if (element.item == deleteValue.trim()) {
                todo.splice(element, 1);
            }
        });

       // setTimeout(() => {
            element.parentElement.parentElement.remove();
       // }, 1);

        setLocalStorage();
    }
//}

function CompletedToDoItems(element) {
    if (element.parentElement.querySelector("div").style.textDecoration === "") {
        const img = document.createElement("img");
        img.src = "/images/check.jpeg";
        img.className = "todo-controls";
        element.parentElement.querySelector("div").style.textDecoration = "line-through";
        element.parentElement.querySelector("div").appendChild(img);
        element.parentElement.querySelector("img.edit").remove();

        todo.forEach((element) => {
            if (
                element.parentElement.querySelector("div").innerText.trim() == element.item
            ) {
                element.status = true;
            }
        });
        setLocalStorage();
        setAlertMessage("Todo item Completed Successfully!");
    }
}
