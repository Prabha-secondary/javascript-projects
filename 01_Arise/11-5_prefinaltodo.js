// This below code is experimental written by me and using two array

// const todoArr =[];
// const todoArr1 =[];
// function addToList(){
//   let input = document.querySelector('.inputTask').value;
//   let inputDate = document.querySelector('.inputDate').value;
  
//   todoArr.push(input);
//   todoArr1.push(inputDate);
//   console.log(todoArr,todoArr1);
//   document.querySelector('.inputTask').value='';
//   document.querySelector('.inputDate').value='';
//   let acc ='';
//   for(let i=0;i<todoArr.length;i++){
//     if (todoArr[i] !== undefined && todoArr[i] !== '' 
//         && todoArr1[i] !== undefined && todoArr1[i] !== '')
//     {
//     acc+=`
//     <p>${todoArr[i]} ${todoArr1[i]} 
//       <button onclick="del(${i});">
//         DELETE
//       </button>
//     </p>
//     `;
//     } 
       
//   }
//   console.log(acc); 
//   document.querySelector('.todoList').innerHTML=acc;

// }

// function del(i){
//  todoArr.splice(i,1);
//  todoArr1.splice(i,1);
//  addToList();
// }

const todoArrObj =[];
function addToList(){
  let input = document.querySelector('.inputTask').value;
  let inputDate = document.querySelector('.inputDate').value;
  
  // let ArrObj ={};
  // ArrObj.task =input;
  // ArrObj.date =inputDate;
  
  //the above three line of code can also be written as below

  //if both the property and value name are same ,we can 
  // use the shorthand property like below

  //let ArrObj={
  //   task,
  //   date
  // } ->this will work the same as below if the property name and value name are same

  let ArrObj={
    task:input,
    date:inputDate
  }

  // let {task,date} =ArrObj; ->this line is called destructuring , it takes the property of the object and put in the variable

  //console.log(task+'1nathan'+date); ->this line is to test destructuring


  if(ArrObj.task && ArrObj.date){
    todoArrObj.push(ArrObj);
  }

  
  console.log(todoArrObj);
  document.querySelector('.inputTask').value='';
  document.querySelector('.inputDate').value='';
  let acc ='';
  for(let i=0;i<todoArrObj.length;i++){
    console.log(todoArrObj.length);
    if (todoArrObj[i].task !== undefined && todoArrObj[i].date !== '')
    {
    acc+=`
    <p>${todoArrObj[i].task} ${todoArrObj[i].date} 
      <button onclick="del(${i});">
        DELETE
      </button>
    </p>
    `;
    } 
       
  }
  console.log(acc); 
  document.querySelector('.todoList').innerHTML=acc;

}

function del(i){
 todoArrObj.splice(i,1);
 addToList();
}