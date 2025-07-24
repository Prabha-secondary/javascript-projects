// function check(){
//   if(event.key==='Enter'){
//     addToList();
//   }
// }
//something as event is deprecated but still works fine

const todoArr =[];
function addToList(){
  let input = document.querySelector('.inputTask').value;
  todoArr.push(input);
  console.log(todoArr);
  document.querySelector('.inputTask').value='';
  
}
