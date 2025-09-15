import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id===deliveryOptionId){
      deliveryOption=option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
  const today =dayjs();
  const {deliveryDays}=deliveryOption;
  let i=1;
  let dateString=today;
  let deliveryDay;
  while(i<=deliveryDays){
    dateString =dateString.add(1,'day');
    deliveryDay=dateString.format('dddd');
    if((deliveryDay!=='Sunday')&&(deliveryDay!=='Saturday')){
      i++;
    }
  }
  return dateString.format('dddd, MMMM D');
}

export const deliveryOptions=[{
  id:'1',
  deliveryDays:7,
  deliveryPrice:0
},{
  id:'2',
  deliveryDays:3,
  deliveryPrice:499
},{
  id:'3',
  deliveryDays:1,
  deliveryPrice:999
}]