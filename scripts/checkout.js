try {
  const cartLoad = JSON.parse(sessionStorage.getItem('cart'));

  cartLoad.forEach(item => {
    cart.push(item);
  });
} catch(e){};

let checkoutHTML = '';

let itemCounter = 0;
let itemsPrice = 0;
let deliveryPrice = 0;

cart.forEach(item => {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === item.productId) {
      matchingProduct = product;
    }
  });

  itemCounter++;
  itemsPrice += matchingProduct.priceCents / 100 * item.quantity;

  checkoutHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src=${matchingProduct.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${matchingProduct.priceCents / 100}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${item.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option" value="0">
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
            <input type="radio" class="delivery-option-input" name="delivery-option" value="4.99">
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
            <input type="radio" class="delivery-option-input" name="delivery-option" value="9.99">
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
    </div>
  `;
});

let totalBefore = itemsPrice + deliveryPrice;
let tax = parseFloat(totalBefore / 10).toFixed(2);
let total = parseFloat(totalBefore + totalBefore / 10).toFixed(2);

let summaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${itemCounter}):</div>
    <div class="payment-summary-money">$${itemsPrice}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${deliveryPrice}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${totalBefore}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${tax}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${total}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
`;

if(itemCounter === 1)
  document.querySelector('.js-counter').innerHTML = `${itemCounter} item`;
else
  document.querySelector('.js-counter').innerHTML = `${itemCounter} items`;
document.querySelector('.js-order-summary').innerHTML = checkoutHTML;
document.querySelector('.js-payment-summary').innerHTML = summaryHTML;