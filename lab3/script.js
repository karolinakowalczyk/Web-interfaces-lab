"use strict"
let taskInput = document.getElementById("task-input"); //input do wpisywania to co uzytkownik
const submitButton=document.getElementById("submit-button"); //button dodający task
let toDoList=document.getElementById("to-do-list"); //ul - lista z taskami to do
let doneList=document.getElementById("done-list");
let lastDeletedList=document.getElementById("last-deleted-list");
let toDoListVeryImportant=document.getElementById("to-do-list-very-important");
const selectionList=document.getElementById("lists");
let toDoListNotImportant=document.getElementById("to-do-list-not-important");
const toDoListsHeaders=document.getElementsByClassName("collapse-head");
let searchInput=document.getElementById("search-input");
let searchCheckBox=document.getElementById("search-checkbox");

//Example
const exampleTaskElement=document.getElementById("example-task-li");
let exampleTaskElementCheckBox=exampleTaskElement.querySelector("input[type=checkbox]");
const exampleTaskElementParagraph=exampleTaskElement.querySelector("p");
const exampleTaskElementDeleteButton=exampleTaskElement.querySelector("button");


// ukrywanie list po kliknięciu w nagłówek
for (let i = 0; i < toDoListsHeaders.length; i++) {
    toDoListsHeaders[i].addEventListener("click", function() {
        let content = this.nextElementSibling;
        
        if (content.style.display !== "none") {
            content.style.display = "none";
        } 
        else{
            content.style.display = "block";
        }
  });
}

const filterTasksInsensitive=() => {
    let filterValue = searchInput.value.toUpperCase();
    //toDoList
    const toDoListLength = toDoList.getElementsByTagName("li").length;
    let toDoListElements = toDoList.querySelectorAll("li.important-li");
    //very important toDoList
    const toDoListVeryImportantLength = toDoListVeryImportant.getElementsByTagName("li").length;
    let toDoListVeryImportantElements = toDoListVeryImportant.querySelectorAll("li.very-important-li");
    //not important toDoList
    const toDoListNotImportantLength = toDoListNotImportant.getElementsByTagName("li").length;
    let toDoListNotImportantElements = toDoListNotImportant.querySelectorAll("li.not-important-li");


    //sprawdzenie listy important
    for(let i = 0; i < toDoListLength; i++){
        let taskName = toDoListElements[i].getElementsByTagName("label")[0];
        if(taskName.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            toDoListElements[i].style.display = "";
        }
        else{
            toDoListElements[i].style.display = "none";
        }
    }

    
    //sprawdzenie listy very important
    for(let i = 0; i < toDoListVeryImportantLength; i++){
        let taskName = toDoListVeryImportantElements[i].getElementsByTagName("label")[0];
        if(taskName.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            toDoListVeryImportantElements[i].style.display = "";
        }
        else{
            toDoListVeryImportantElements[i].style.display = "none";
        }
    }

    
    //sprawdzenie listy not important
    for(let i = 0; i < toDoListNotImportantLength; i++){
        let taskName = toDoListNotImportantElements[i].getElementsByTagName("label")[0];
        if(taskName.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            toDoListNotImportantElements[i].style.display = "";
        }
        else{
            toDoListNotImportantElements[i].style.display = "none";
        }
    }
}

const filterTasksSensitive=() => {
    let filterValue = searchInput.value;
    //toDoList
    const toDoListLength = toDoList.getElementsByTagName("li").length;
    let toDoListElements = toDoList.querySelectorAll("li.important-li");
    //very important toDoList
    const toDoListVeryImportantLength = toDoListVeryImportant.getElementsByTagName("li").length;
    let toDoListVeryImportantElements = toDoListVeryImportant.querySelectorAll("li.very-important-li");
    //not important toDoList
    const toDoListNotImportantLength = toDoListNotImportant.getElementsByTagName("li").length;
    let toDoListNotImportantElements = toDoListNotImportant.querySelectorAll("li.not-important-li");


    //sprawdzenie listy important
    for(let i = 0; i < toDoListLength; i++){
        let taskName = toDoListElements[i].getElementsByTagName("label")[0];
        if(taskName.innerHTML.indexOf(filterValue) > -1){
            toDoListElements[i].style.display = "";
        }
        else{
            toDoListElements[i].style.display = "none";
        }
    }

    
    //sprawdzenie listy very important
    for(let i = 0; i < toDoListVeryImportantLength; i++){
        let taskName = toDoListVeryImportantElements[i].getElementsByTagName("label")[0];
        if(taskName.innerHTML.indexOf(filterValue) > -1){
            toDoListVeryImportantElements[i].style.display = "";
        }
        else{
            toDoListVeryImportantElements[i].style.display = "none";
        }
    }

    
    //sprawdzenie listy not important
    for(let i = 0; i < toDoListNotImportantLength; i++){
        let taskName = toDoListNotImportantElements[i].getElementsByTagName("label")[0];
        if(taskName.innerHTML.indexOf(filterValue) > -1){
            toDoListNotImportantElements[i].style.display = "";
        }
        else{
            toDoListNotImportantElements[i].style.display = "none";
        }
    }
}


searchCheckBox.addEventListener('change', (event)=> {

    if(event.currentTarget.checked){
        searchInput.addEventListener("keyup", filterTasksInsensitive);
    }
    else{
        searchInput.addEventListener("keyup", filterTasksSensitive);
    }
});

searchInput.addEventListener("keyup", filterTasksInsensitive);

const ifTaskCompleted=(checkBoxItem, paragraphItem) => {
   
    checkBoxItem.addEventListener('change', (event)=> {
        if(event.currentTarget.checked){
            doneList.appendChild(checkBoxItem.parentNode);
            const today = new Date();

            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            const dateTime = date+' '+time;
            paragraphItem.innerHTML = `${dateTime}`;
            paragraphItem.style.display = "inline";
        }
        else{
            if(checkBoxItem.parentNode.className === "important-li list-group-item"){
                toDoList.appendChild(checkBoxItem.parentNode);
            }
            else if(checkBoxItem.parentNode.className === "very-important-li list-group-item"){
                toDoListVeryImportant.appendChild(checkBoxItem.parentNode);
            }
            else if(checkBoxItem.parentNode.className === "not-important-li list-group-item"){
                toDoListNotImportant.appendChild(checkBoxItem.parentNode);
            }
            
            paragraphItem.style.display = "none";
        }
    })
}


const deleteTask=(deleteButton, listItem) => {
    $(deleteButton).click(function(){
        confirmDialog('Are you sure?', listItem);
    })
}


const confirmDialog=(message, listItem) =>{
  $('<div></div>').appendTo('body')
    .html('<div><h6>' + message + '?</h6></div>')
    .dialog({
      modal: true,
      title: 'Delete task',
      zIndex: 10000,
      autoOpen: true,
      width: 'auto',
      resizable: false,
      buttons: {
        Yes: function() {
            $(lastDeletedList).empty();
            let cloneListItem = $(listItem).clone();
            $(cloneListItem).children("input[type=checkbox]").css("display", "none");
            $(cloneListItem).children("button").css("display", "none");
            const restoreButton = $("<button> Restore </button>");
            $(restoreButton).addClass("btn btn-info text-white");
            $(lastDeletedList).append(cloneListItem);
            $(cloneListItem).append(restoreButton);
            $(listItem).hide();
            restoreButton.click(function(){
                $(listItem).show();
                $(cloneListItem).remove();
            })

            $(this).dialog("close");
        },
        No: function() {
            $(this).dialog("close");
        }
      },
      close: function(event, ui) {
            $(this).remove();
      }
    });
};

//Przykładowy task
ifTaskCompleted(exampleTaskElementCheckBox, exampleTaskElementParagraph);
deleteTask(exampleTaskElementDeleteButton, exampleTaskElement);


//za każdym razem jak tworzę taska, ma on te elementy, argument: to co wpisał uzytkownik
const createNewTaskElement = (taskName) => {
    let listItem=document.createElement("li");

	let checkBox=document.createElement("input");

	let label=document.createElement("label");

	let paragraph=document.createElement("p");

    let deleteButton=document.createElement("button");

    label.innerText =  taskName; //w labelu pojawia się to co wpisał uzytkownik

    checkBox.type = "checkbox";

    paragraph.style.display = "inline";

    deleteButton.innerText="X";
    deleteButton.className="btn btn-danger"
    deleteButton.style.float="right"

    ifTaskCompleted(checkBox, paragraph);
    deleteTask(deleteButton, listItem);
    listItem.appendChild(checkBox); //wszystkie te elementy są jako jedno li
    listItem.appendChild(label); 
    listItem.appendChild(paragraph);
    listItem.appendChild(deleteButton);
    return listItem;
}

const addTask = () => {
    if (taskInput.value === ""){
        alert("Please input you task");
    }
    else{
        let listItem=createNewTaskElement(taskInput.value) //towrze nowy element listy z tym wartościa inputa ktora wpisał użytkownik
        //sprawdzam, do której listy dodać
        if(selectionList.value==="important"){
            listItem.className ="important-li list-group-item";
            toDoList.appendChild(listItem);
        }
        else if (selectionList.value==="very-important"){
            listItem.className ="very-important-li list-group-item";
            toDoListVeryImportant.appendChild(listItem);
        }
        else if (selectionList.value==="not-important"){
            listItem.className ="not-important-li list-group-item";
            toDoListNotImportant.appendChild(listItem);
        }      
    }   
}

submitButton.addEventListener("click", addTask);



