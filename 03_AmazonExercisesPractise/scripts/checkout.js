import {calculateCartQuantity, cart, deleteFromCart, updateQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";

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

  cartTotalHTML+=
                  `<div class="cart-item-container js-cart-item-container-${matchedProduct.id}">
                    <div class="delivery-date">
                      Delivery date: Tuesday, June 21
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
                        <div class="delivery-option">
                          <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${matchedProduct.id}">
                          <div>
                            <div class="delivery-option-date">
                              Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                              FREE Shipping
                            </div>
                          </div>
                        </div>
                        <div class="delivery-option">
                          <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchedProduct.id}">
                          <div>
                            <div class="delivery-option-date">
                              Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                              $4.99 - Shipping
                            </div>
                          </div>
                        </div>
                        <div class="delivery-option">
                          <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchedProduct.id}">
                          <div>
                            <div class="delivery-option-date">
                              Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                              $9.99 - Shipping
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;
});

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