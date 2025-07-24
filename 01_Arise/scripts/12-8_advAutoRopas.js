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

  //to understand the behavior of javascript because when the autoplay is working and the 
  //button is also manually clicked javascript handles like -there will be no priority 
  //but the function which is stacked to execute at the last will be diplayed in the UI
  //and it not like which is pressed last it depends upon the stack in which they are stacked
  console.log("Autoplay fired at:", Date.now());


}

function stopauto(){
  isAutoplay=false;
  clearInterval(toStopID);
}

//Converted onclick to addEventListener

const rockButton=document.getElementById('rock-button-js');
rockButton.addEventListener('click',()=>{const compMove=randomNum();
                                         results(compMove,'Rock');

                                         //to understand the behavior of javascript
                                         console.log("Manual click at:", Date.now());
                   
                            });

const paperButton=document.getElementById('paper-button-js');
paperButton.addEventListener('click',()=>{const compMove=randomNum();
                                         results(compMove,'Paper');
                   
                            });         

const scissorsButton=document.getElementById('scissors-button-js');
scissorsButton.addEventListener('click',()=>{const compMove=randomNum();
                                         results(compMove,'Scissors');
                   
                            });

const restartButton=document.getElementById('restart-button-js');
restartButton.addEventListener('click',restartingKey); //this is also one way - just passing the 
                                                    //reference of the function
                                                    //in the parameters of addEventListener  

function restartingKey(){
  score.loss=0;
  score.ties=0;
  score.wins=0;
  document.querySelector('.score').innerText='Game Restart!!!\n\nWins:0 --- Loss:0 --- Ties:0';
  localStorage.removeItem('score');
  restarting();
  stopauto();
  autoPlayButton.innerText='AUTOPLAY';
}  

function autoPlayCheck(){
  if(!isAutoplay){
    autoplay();
    autoPlayButton.innerText='STOPPLAY';
  }
  else{
    stopauto();
    autoPlayButton.innerText='AUTOPLAY';}

}
  
const autoPlayButton=document.querySelector('.js-autoplay');
autoPlayButton.addEventListener('click',()=>{autoPlayCheck()});

document.body.addEventListener('keydown',(event)=>{if((event.key==='a')||(event.key==='A')){
                                                      autoPlayCheck();
                                                      console.log(`${event.key} is pressed`);}
})

document.body.addEventListener('keydown',(event)=>{if(event.key==='Backspace'){
                                                      restartingKey();
                                                      console.log(`${event.key} is pressed`);}
})