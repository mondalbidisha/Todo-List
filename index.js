const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completeTaskHolder = document.getElementById('completed-tasks');

const createNewTask = (taskString) => {
  var listElement = document.createElement('li');
  var inputElement = document.createElement('input');
  var checkboxElement = document.createElement('input');
  var labelElement = document.createElement('label');
  var editButtonElement = document.createElement('button');
  var deleteButtonElement = document.createElement('button');

  checkboxElement.type = "checkbox";
  inputElement.type = "text";

  editButtonElement.innerText = "Edit";
  deleteButtonElement.innerText = "Delete";

  editButtonElement.className = "edit-task";
  deleteButtonElement.className = "delete-task";

  labelElement.innerText = taskString;

  listElement.appendChild(checkboxElement);
  listElement.appendChild(labelElement);
  listElement.appendChild(inputElement);
  listElement.appendChild(editButtonElement);
  listElement.appendChild(deleteButtonElement);

  return listElement;
}

const addTask = () => {
  console.log("Add Task ...");
  var listItem = createNewTask(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

const editTask = (event) => {
  console.log("Editing Task ...");
  var listItem = event.target.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");

  if(containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle("editMode");
}

const deleteTask = (event) => {
  console.log('Deleting a Task ...');
  var listItem = event.target.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
}

const completeTask = (event) => { 
  console.log("Mark task as complete ...");
  var listItem = event.target.parentNode;
  completeTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const bindTaskEvents = (listItem, taskStatusHandler) => {
  console.log("Bind Events to tasks ...");
  var checkbox = listItem.querySelector('input[type="checkbox"]');
  var editButton = listItem.querySelector('button.edit-task');
  var deleteButton = listItem.querySelector('button.delete-task');
  editButton.addEventListener("click", (event) => editTask(event));
  deleteButton.addEventListener("click", (event) => deleteTask(event));
  checkbox.addEventListener("change", (event) => taskStatusHandler(event));
}

const taskIncomplete = (event) => {
  console.log("Task Incomplete...");
 	//When the checkbox is unchecked appendTo #incomplete-tasks
  var listItem = event.target.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const taskCompleted = (event) => {
  console.log("Task Incomplete...");
 	//When the checkbox is unchecked appendTo #incomplete-tasks
  var listItem = event.target.parentNode;
  completeTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

for (var i = 0; i < incompleteTaskHolder.children.length; i ++) {
  //bind events to list item's children (taskCompleted)	
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completeTaskHolder.children.length; i ++) {
  //bind events to list item's children (taskCompleted)	
  bindTaskEvents(completeTaskHolder.children[i], taskIncomplete);
}

addTaskButton.addEventListener("click", addTask);  