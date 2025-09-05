import {cart, calculateCartQuantity} from "../../data/cart.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js";
import {getProduct} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";

export function renderpaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;
  cart.forEach((cartItem)=>{
  const {productId,quantity,deliveryOptionId}=cartItem;
  const product=getProduct(productId);
  productPriceCents+=product.priceCents * quantity;
  const deliveryOption =getDeliveryOption(deliveryOptionId);
  shippingPriceCents+=deliveryOption.deliveryPrice;

});

const deliveryQuantity=calculateCartQuantity();
const totalBeforeTaxCents=productPriceCents+shippingPriceCents;
const taxCents=totalBeforeTaxCents*0.1;
const totalCents=totalBeforeTaxCents+taxCents;

const paymentSummaryHTML=`
                          <div class="payment-summary-title">
                            Order Summary
                          </div>

                          <div class="payment-summary-row">
                            <div>Items (${deliveryQuantity}):</div>
                            <div class="payment-summary-money">
                            &#8377 ${formatCurrency(productPriceCents)}
                            </div>
                          </div>

                          <div class="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div class="payment-summary-money">
                            &#8377 ${formatCurrency(shippingPriceCents)}
                            </div>
                          </div>

                          <div class="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div class="payment-summary-money">
                            &#8377 ${formatCurrency(totalBeforeTaxCents)}
                            </div>
                          </div>

                          <div class="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div class="payment-summary-money">
                            &#8377 ${formatCurrency(taxCents)}
                            </div>
                          </div>

                          <div class="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div class="payment-summary-money">
                            &#8377 ${formatCurrency(totalCents)}
                            </div>
                          </div>

                          <button class="place-order-button button-primary">
                            Place your order
                          </button>
`;

document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

}