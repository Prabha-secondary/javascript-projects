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
     <button class="del-js del-css data-index="${i}">DELETE</button>
    `;
  });

  document.querySelector('.display-js').innerHTML=accumulator;

  // document.querySelectorAll('.del-js').forEach((val,i)=>{
  //                                      val.addEventListener('click',()=>del(i));
  // });
  
  //You loop through each task in the array (value) and build one HTML block
  //You don’t include the task’s index (i) in that string
  //Instead, you bind an event listener afterward using the index i from the second forEach 


  //You assume that these buttons align perfectly with the array indices from todoArray. But ?
  //that only holds true if the HTML was rendered cleanly and synchronously — which isn’t 
  //always guaranteed, especially if the DOM changes dynamically or if something interrupts 
  //rendering (like another component updating HTML out of sync).

  // So:
  // If a button misaligns or the order shifts,
  // You’ll run del(i) on the wrong index
  // Or worse: it’ll delete nothing

  // Use "data-index" and bind safely -below is the code
  document.querySelectorAll('.del-js').forEach((button) => {
  const index = parseInt(button.getAttribute('data-index'));
  button.addEventListener('click', () => del(index));
  });

  // Topic	                  Unsafe Version	                Safe Version
  //
  // Index Tracking	          External binding              	Internal embedding 
  //                          via forEach(i)                  using onclick or 
  //                                                          data-index
  //
  // Risk of Misalignment	    High if DOM order 	            None — index travels 
  //                          breaks                          with the button
  // 
  // Simplicity	              Simple but 	                    Slightly more verbose,
  //                          risky                           but fully reliable

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
