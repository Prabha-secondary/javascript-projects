export const cart =[];

export function addToCart(productId,quantity){
  let matched;
    cart.forEach((cartItem)=>{
      if(cartItem.productId===productId)
        matched=cartItem;
    }); 
    if(matched){
      matched.quantity+=quantity;
    }  
    else{
      cart.push({
      productId,
      quantity
      });
    }
}