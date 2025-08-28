import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML ='';

products.forEach((product)=>{
  productsHTML += ` 
                <div class="product-container">
                  <div class="product-image-container">
                    <img class="product-image"
                      src="${product.image}">
                  </div>

                  <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                  </div>

                  <div class="product-rating-container">
                    <img class="product-rating-stars"
                      src="images/ratings/rating-${product.rating.stars*10}.png">
                    <div class="product-rating-count link-primary">
                      ${product.rating.count}
                    </div>
                  </div>

                  <div class="product-price">
                    &#8377 ${(product.priceCents/100).toFixed(2)}
                  </div>

                  <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                      <option selected value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>

                  <div class="product-spacer"></div>

                  <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                  </div>

                  <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                  </button>
                </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

let timerID={};//interesting thing to look into as it works good in setTimeout

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  // let timerID; //this is for closure
  button.addEventListener('click',()=>{
    const {productId} = button.dataset;
    const quantity =Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    //this productId is not like what we are getting from dataset after adding data attribute
    //this comes from above line as in while creating html we add access from products using 
    //forEach loop but here we are accessing through the dataset
    let matched;
    cart.forEach((item)=>{
      if(item.productId===productId)
        matched=item;
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

    const addedmsg =document.querySelector(`.js-added-to-cart-${productId}`);
    addedmsg.classList.add('added-to-cart-visible');

    if(timerID[productId]){
      console.log(timerID[productId]);
      clearTimeout(timerID[productId]);
    }
    
    timerID[productId]=setTimeout(()=>{
      addedmsg.classList.remove('added-to-cart-visible');
    },2000);

    let totalCartQuantity=0;
    cart.forEach((item)=>{
      totalCartQuantity+=item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerText=totalCartQuantity;  
  });
});


// document.querySelectorAll('.js-add-to-cart').forEach((button) => {
//   let timerID;

//   button.addEventListener('click', () => {
//     if (timerID) {
//       clearTimeout(timerID);
//     }

//     timerID = setTimeout(() => {
//       // hide message
//     }, 2000);
//   });
// });
// please go through the above lines of code because this is a beautiful feature of javascript
// called closure here you can see it is creating a timerID for every button as it is in for loop
// but the speciality is it does not forget its timerID , to clearly explain even if another button is
// clicked the inner click eventListener does remember the timerID of previous button and finishes the 
// setTimeout function eventhough the previous function is finished.
