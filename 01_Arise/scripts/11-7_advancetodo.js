const todoArray =[];

function addToList(){

  let task = document.querySelector('.task-js').value;
  let date = document.querySelector('.date-js').value;

  if(task && date){
    todoArray.push({task,date});
    localStorage.setItem('stored',JSON.stringify(todoArray));
    display();
  }

  else{
    alert('Enter both the task and date');
  }
  
  document.querySelector('.task-js').value = '';
  document.querySelector('.date-js').value = '';

}

function display(){
  
  let accumulator = '';

  // for(let i = 0; i < todoArray.length; i++){
  //    accumulator +=`
  //    <div class="distask-js distask-css">${todoArray[i].task}</div> 
  //    <div class="disdate-js disdate-css">${todoArray[i].date}</div>  
  //    <button class="del-js del-css" onclick = "del(${i});">DELETE</button>
  //   `;
  // }

  todoArray.forEach(function(value,i){
     accumulator +=`
     <div class="distask-js distask-css">${value.task}</div> 
     <div class="disdate-js disdate-css">${value.date}</div>  
     <button class="del-js del-css" onclick = "del(${i});">DELETE</button>
    `;
  });

  document.querySelector('.display-js').innerHTML=accumulator;

}

function del(i){

  todoArray.splice(i,1);
  localStorage.setItem('stored', JSON.stringify(todoArray));
  display();

}

const savedData = JSON.parse(localStorage.getItem('stored'));
if (savedData) {
  todoArray.push(...savedData);//->this line of code is used instead of below lines
  // for (let i = 0; i < savedData.length; i++) {
  //   todoArray.push(savedData[i]);
  // }
  display();
}
