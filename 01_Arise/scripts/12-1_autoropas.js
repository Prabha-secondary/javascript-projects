const score=JSON.parse(localStorage.getItem('score')) || {loss:0,
  ties:0,
  wins:0};

let isAutoplay=false;
let toStopID;  
function randomNum(){

  let compMove='';
  const ranNum=Math.random();
  if(ranNum>=0 && ranNum<1/3)
  compMove='Rock';
  else if(ranNum>=1/3 && ranNum<2/3)
  compMove='Paper';
  else 
  compMove='Scissors';
  return compMove;

}

function results(compMove,yourMove){ 
    
  let result='';
  if(compMove===yourMove)
  {
  result='Tie';
  score.ties+=1;
  }
  else if((compMove==='Rock' && yourMove==='Scissors') || 
  (compMove==='Scissors' && yourMove==='Paper')||
  (compMove==='Paper' && yourMove==='Rock'))
  {
  result='Lose';
  score.loss+=1;
  }
  else 
  {
  result='Won'; 
  score.wins+=1;
  } 

  localStorage.setItem('score',JSON.stringify(score));

  let outcome =document.querySelector('.outcome');

  outcome.innerHTML=`${result}`;

  let display =document.querySelector('.display');

  display.innerHTML=`You--> <img src="sample_images/${yourMove}-emoji.png" class="hand-sign"> <img src="sample_images/${compMove}-emoji.png" class="hand-sign"> <--Computer`;

  let scorer = document.querySelector('.score');

  scorer.innerText=`You chose ${yourMove}. Computer chose ${compMove} ... \n\nResult is ${result}...\n\nWins:${score.wins} --- Loss:${score.loss} --- Ties:${score.ties}`;    

}

function restarting(){
    
  let outcome =document.querySelector('.outcome');

  outcome.innerHTML='';

  let display =document.querySelector('.display');

  display.innerHTML='';

}

function autoplay(){

  if(!isAutoplay){

    isAutoplay=true;  
    toStopID=setInterval(toAutoplay,2000);
    //here you should pass the function itself instead 
    //of calling it once like 
    //setInterval(toAutoplay(),1000)

  }

}

function toAutoplay(){

  // const autoplay =['Rock','Paper','Scissors'];
  // const compMove =randomNum();
  // results(compMove,autoplay[Math.floor(Math.random()*autoplay.length)]);
  //Instead of these lines of code above,simply we can use
  results(randomNum(),randomNum());

}

function stopauto(){
  isAutoplay=false;
  clearInterval(toStopID);
}