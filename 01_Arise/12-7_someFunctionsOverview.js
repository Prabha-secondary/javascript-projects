
function suma(n){
  console.log(n.filter((nu,i)=>nu>0).length);
}

suma([1, -3, 5]);

function mathu(arr,n){
  console.log(arr.map((val,i)=>val+n));
}

mathu([-2, -1, 0, 99], 2);

function removing(arr){
  let count=0;
  return arr.filter(val=>{
    
    if(val==='egg'&&count<2){
      count++;return false;}
    return true;
    }

    );
}

console.log(removing(['egg', 'apple', 'egg', 'egg', 'ham']));