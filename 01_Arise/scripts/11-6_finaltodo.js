const todoArray =[];

function addToList(){

  let task = document.querySelector('.task-js').value;
  let date = document.querySelector('.date-js').value;

  if(task && date){
    todoArray.push({task,date});
  }
  else{
    alert('Enter both the task and date');
  }
  
  document.querySelector('.task-js').value = '';
  document.querySelector('.date-js').value = '';

  display();
  
}

function display(){

  let accumulator = '';

  for(let i = 0; i < todoArray.length; i++){
     accumulator +=`
     <div class="distask-js distask-css">${todoArray[i].task}</div> 
     <div class="disdate-js disdate-css">${todoArray[i].date}</div>  
     <button class="del-js del-css" onclick = "del(${i});">DELETE</button>
    `;
  }

  document.querySelector('.display-js').innerHTML=accumulator;

}

function del(i){

  todoArray.splice(i,1);
  display();

}