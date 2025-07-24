//Ready for the production - some more adjustments, ready to go live
//Still need to do many more code changes and implement DRY principle
const score=JSON.parse(localStorage.getItem('score')) || {loss:0,
                                                          ties:0,
                                                          wins:0};

let allowKeyInput=true;
let allowKeyInputForAuto=true;                                                         
let isAutoplay=false;
let toStopID; 
const docAccess=document.body;

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

  scorer.innerText=`### You chose ${yourMove}. Computer chose ${compMove} ... \n\nResult is ${result}...\n\nWins:${score.wins} --- Loss:${score.loss} --- Ties:${score.ties}`;    

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
    
  }

}

function toAutoplay(){

  results(randomNum(),randomNum());

}

function stopauto(){

  isAutoplay=false;
  clearInterval(toStopID);

}

const rockButton=document.getElementById('rock-button-js');
rockButton.addEventListener('click',()=>{
  const compMove=randomNum();
  results(compMove,'Rock');                   
});

docAccess.addEventListener('keydown',(event)=>{
  if((event.key==='r')||(event.key==='R')){
    if(!allowKeyInput)
    return;
    const compMove=randomNum();
    results(compMove,'Rock');                   
  }
});                            

const paperButton=document.getElementById('paper-button-js');
paperButton.addEventListener('click',()=>{
  const compMove=randomNum();
  results(compMove,'Paper');          
});    
                            
docAccess.addEventListener('keydown',(event)=>{
  if(!allowKeyInput)
    return;
  if((event.key==='p')||(event.key==='P')){
    const compMove=randomNum();
    results(compMove,'Paper');                   
  }
});                              

const scissorsButton=document.getElementById('scissors-button-js');
scissorsButton.addEventListener('click',()=>{
  const compMove=randomNum();
  results(compMove,'Scissors');                   
});

docAccess.addEventListener('keydown',(event)=>{
  if((event.key==='s')||(event.key==='S')){
    if(!allowKeyInput)
    return;
    const compMove=randomNum();
    results(compMove,'Scissors');                   
  }
});   

const restartButton=document.getElementById('restart-button-js');
restartButton.addEventListener('click',confirmation); 

const autoPlayButton=document.querySelector('.js-autoplay');
autoPlayButton.addEventListener('click',()=>{autoPlayCheck()});

function resBtnCtrlOn(){
  document.querySelector('.js-autoplay').disabled=true;  
  allowKeyInput=false;
  allowKeyInputForAuto=false;
}

function resBtnCtrlOff(){
  document.querySelector('.js-autoplay').disabled=false;
  allowKeyInput=true;
  allowKeyInputForAuto=true;
}

function clickOptionsOn(){
  document.querySelector('#rock-button-js').disabled=true;
  document.querySelector('#paper-button-js').disabled=true;
  document.querySelector('#scissors-button-js').disabled=true;
}

function clickOptionsOff(){
  document.querySelector('#rock-button-js').disabled=false;
  document.querySelector('#paper-button-js').disabled=false;
  document.querySelector('#scissors-button-js').disabled=false;
}

let county =0;
function confirmation(){
  console.log(county);
  county++;
  resBtnCtrlOn();
  clickOptionsOn();
  const confirming = document.querySelector('.js-confirmation');
  confirming.innerHTML=`<p class="cs-con js-con">ARE YOU SURE TO RESTART ?</p>
  <div class="cs-conbut js-conbut">
  <button class="cs-yes js-yes">YES</button>
  <button class="cs-no js-no">NO</button>
  </div>`;
  confirmed();
  document.querySelector('#restart-button-js').disabled=true;

} 

function confirmed(){

  const yesBtn=document.querySelector('.js-yes');
  yesBtn.addEventListener('click',()=>{
    restartingKey();document.querySelector('.js-confirmation').innerHTML='';
    resBtnCtrlOff();
    clickOptionsOff();
    document.querySelector('#restart-button-js').disabled=false;
  });

  const noBtn=document.querySelector('.js-no');
  noBtn.addEventListener('click',()=>{
    document.querySelector('.js-confirmation').innerHTML='';
    resBtnCtrlOff();
    clickOptionsOff();
    document.querySelector('#restart-button-js').disabled=false;
  });

  docAccess.addEventListener('keydown',(event)=>{
    if((event.key==='y')||(event.key==='Y'))
      {
        restartingKey();document.querySelector('.js-confirmation').innerHTML='';
        resBtnCtrlOff();
        clickOptionsOff();
        document.querySelector('#restart-button-js').disabled=false;
      }
    else if((event.key==='n')||(event.key==='N'))
      {
        document.querySelector('.js-confirmation').innerHTML='';
        resBtnCtrlOff();
        clickOptionsOff();
        document.querySelector('#restart-button-js').disabled=false;
      } 
    });  

}

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
    document.querySelector('#restart-button-js').disabled=true;
    clickOptionsOn();
    allowKeyInput=false;
    autoplay();
    autoPlayButton.innerText='STOPPLAY';
  }
  else{
    document.querySelector('#restart-button-js').disabled=false;
    clickOptionsOff();
    allowKeyInput=true;
    stopauto();
    autoPlayButton.innerText='AUTOPLAY';
  }

}
  
docAccess.addEventListener('keydown',(event)=>{
  if((!allowKeyInput)&&(!allowKeyInputForAuto))
    return; 
  if((event.key==='a')||(event.key==='A')){
  autoPlayCheck();
  console.log(`${event.key} is pressed`);
  }
});

docAccess.addEventListener('keydown',(event)=>{
  if(!allowKeyInput)
    return;
  if(event.key==='Backspace'){
  confirmation();
  console.log(`${event.key} is pressed`);
  }
});
