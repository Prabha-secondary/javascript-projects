import {calculateCartQuantity, 
        cart, deleteFromCart, 
        updateQuantity,updateDeliveryOption} from "../data/cart.js";
import {deliveryOptions} from "../data/deliveryOptions.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

// const today =dayjs();//external libraries' function
// const deliveryDate=today.add(7,'days');//EL' function
// console.log(deliveryDate.format('dddd, MMMM D'));

function renderOrderSummary(){
let cartTotalHTML='';

cart.forEach((cartItem)=>{
  const {productId}=cartItem;
  const {quantity}=cartItem;
  let matchedProduct;
  products.forEach((product)=>{
    if(productId===product.id){
      matchedProduct=product;
    }
  });

const {deliveryOptionId} =cartItem;
let deliveryOption;
deliveryOptions.forEach((option)=>{
  if(option.id===deliveryOptionId){
    deliveryOption=option;
  }
});

const today =dayjs();
const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
const dateString=deliveryDate.format('dddd, MMMM D');

  cartTotalHTML+=
                  `<div class="cart-item-container js-cart-item-container-${matchedProduct.id}">
                    <div class="delivery-date">
                      Delivery date: ${dateString}
                    </div>

                    <div class="cart-item-details-grid">
                      <img class="product-image"
                        src="${matchedProduct.image}">

                      <div class="cart-item-details">
                        <div class="product-name">
                          ${matchedProduct.name}
                        </div>
                        <div class="product-price">
                          &#8377 ${formatCurrency(matchedProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                          <span>
                            Quantity: <span class="quantity-label cs-quantity-label js-quantity-label-${matchedProduct.id}">${quantity}</span>
                          </span>
                          <span class="update-quantity-link cs-update-quantity-link link-primary js-update-link" data-product-id="${matchedProduct.id}">
                            Update
                          </span>
                          <input class="quantity-input cs-quantity-input js-quantity-input-${matchedProduct.id}">
                          <span class="save-quantity-link cs-save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchedProduct.id}">Save</span>
                          <span class="delete-quantity-link link-primary js-delete-link" 
                          data-product-id="${matchedProduct.id}">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div class="delivery-options">
                        <div class="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchedProduct,cartItem)}
                      </div>
                    </div>
                  </div>`;
});

function deliveryOptionsHTML(matchedProduct,cartItem){
  let deliveryHTML='';
  deliveryOptions.forEach((deliveryOption)=>{
    const isChecked=deliveryOption.id===cartItem.deliveryOptionId?'checked':'';
    const today =dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');
    const priceString=deliveryOption.deliveryPrice===0?
                      'FREE':
                      `&#8377 ${formatCurrency(deliveryOption.deliveryPrice)} -`;
    deliveryHTML+=
                  `
                    <div class="delivery-option js-delivery-option" 
                    data-product-id=${matchedProduct.id}
                    data-delivery-option-id=${deliveryOption.id}>
                      <input type="radio" ${isChecked}
                        class="delivery-option-input"
                        name="delivery-option-${matchedProduct.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} Shipping
                        </div>
                      </div>
                    </div>
                  `;
  });
  return deliveryHTML;
}

document.querySelector('.js-order-summary').innerHTML=cartTotalHTML;

document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const {productId} = link.dataset;
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const {productId} = link.dataset;
    deleteFromCart(productId);
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCartQuantity();
  });
});

document.querySelectorAll('.js-save-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const {productId} = link.dataset;
    const newQuantity=Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    if(newQuantity<=0 || newQuantity>=100){
      return;
    }
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    updateQuantity(productId,newQuantity);
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
    updateCartQuantity();
  });
    
  //this below is written for the 'ENTER' keydown event -i understood but little confusing
  const {productId} = link.dataset;
  const input =document.querySelector(`.js-quantity-input-${productId}`);
  input.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
      link.click();
    }
  });

});


function updateCartQuantity(){
  const totalCartQuantity=calculateCartQuantity();
  document.querySelector('.js-return-to-home-link').innerHTML = `${totalCartQuantity} items`;
}

updateCartQuantity();

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  const {productId,deliveryOptionId}=element.dataset;
  element.addEventListener('click',()=>{
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummary();
  });
});

}

renderOrderSummary();