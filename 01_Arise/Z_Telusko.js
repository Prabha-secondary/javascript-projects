//Using Telusko 

// 1)

// function truth(){
//     return "hello Prabha";
// }

// function truth1(deipunda){
//     return `The Others are ${deipunda}`;
// }

// let returned1 =truth1('joker');
// let returned =truth();
// console.log(returned);

// ---------------------------------------------------------------------------

// 2)

// let a = function(n1,n2){
//     return n1+n2;
// }
// let sum = a(1,2);
// let sum1=a;
// let sum2=sum1;   
// console.log(sum);
// console.log(sum1);
// console.log(sum1(1,2));
// console.log(sum2);
// console.log(sum2(1,2));
// console.log(a(1,2));

// ----------------------------------------------------------------------

// 3)

// function hoisting(u){

//     console.log(user);
//     return `Hello ${u}`;
// }

// let user = "Prabha";
// console.log(hoisting("Thivya"));

// ----------------------------------------------------------------------

// 4)

// let values =[11,12,13];
// console.log(values);
// values.push(14);
// console.log(values);
// values[4]=15;
// console.log(values);
// values[6]=17;
// console.log(values);

// ---------------------------------------------------------------------

// 5)

// let values=[1,2,2];
// console.log(values.push(3));
// console.log(values.splice(1));
// console.log(values);

// ----------------------------------------------------------------------

// 6)

// let truth ="Prabha is always the Great" ;
// let [a,b,,...d]=truth.split(" ");
// console.log(a,d);

// -----------------------------------------------------------------------

// 7)

// let nums =[12,13,14];

// nums.forEach((n,i,nums)=>{console.log(n,i,nums)});

// -----------------------------------------------------------------------

// 8)
 
// let nums =[4,2,33];

// console.log(nums.filter(n=>n%2===0)
//                 .map(n=>n*2)
//                 .reduce((n1,n2)=>n1+n2)
//             );

// ------------------------------------------------------------------------

// 9)

// let nums =new Set();

// nums.add("sfgr");
// nums.add(2);
// nums.add(2);
// nums.add("prabha");

// for (n of nums){
//     console.log(n);
// }

// nums.forEach((n ,n2,nums)=>console.log(n,n2,nums));

// nums.forEach(n=>console.log(n));

// ----------------------------------------------------------------------

// 10)

let num=1
let show =function(){
    console.log("Hi",num);
    num++
    show();
}

show();
