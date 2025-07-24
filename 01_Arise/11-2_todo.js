// const todoArr =[];
// function addToList(){
//   let input = document.querySelector('.inputTask').value;
//   let p = document.createElement('p');
//   p.innerHTML=input;
//   document.body.appendChild(p);
//   todoArr.push(input);
//   console.log(todoArr);
//   document.querySelector('.inputTask').value='';
  
// }
// the above is what i did todoList without using the array and also different method using createElement function but in the video they have used array so i try to implement it below

const todoArr =[];
function addToList(){
  let input = document.querySelector('.inputTask').value;
  todoArr.push(input);
  console.log(todoArr);
  document.querySelector('.inputTask').value='';
  let acc ='';
  for(let i=0;i<todoArr.length;i++){
    acc+=`<p>${todoArr[i]}</p>`; 
       
  }
  console.log(acc); 
  document.querySelector('.todoList').innerHTML=acc;
}

