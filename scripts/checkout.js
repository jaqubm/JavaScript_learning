//Loading cart from sessionStorage
try {
  const cartLoad = JSON.parse(sessionStorage.getItem('cart'));

  cartLoad.forEach(item => {
    cart.push({
      productId: item.productId,
      quantity: item.quantity,
      delivery: item.delivery
    });
  });
} catch(e) {};

let itemCounter = 0;
let itemsPrice = 0;

const cartFunctions = () => {
  cart.forEach((item) => {
    //Choosing delivery options
    if(document.querySelector(`input[name="delivery-option-${item.productId}"]`)) {
      document.querySelectorAll(`input[name="delivery-option-${item.productId}"]`).forEach((element) => {
        element.addEventListener('change', (event) => {
          item.delivery = Number(event.target.value);
          deliveryCalc();
        });
      });
    }

    //Deleting product from cart
    document.querySelector(`.js-delete-${item.productId}`).addEventListener('click', () => {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
      orderSummary();
    });
  });
};

//Inserting cart into HTML
const orderSummary = () => {
  itemCounter = 0;
  itemsPrice = 0;
  
  let cartHTML = '';

  cart.forEach(item => {
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === item.productId) {
        matchingProduct = product;
      }
    });

    itemCounter++;
    itemsPrice += matchingProduct.priceCents * item.quantity;

    cartHTML += `
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
              <span class="delete-quantity-link link-primary js-delete-${item.productId}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options js-delivery">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" ${item.delivery === 0 ? "checked" : ""} class="delivery-option-input" name="delivery-option-${item.productId}" value="0">
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
              <input type="radio" ${item.delivery === 499 ? "checked" : ""} class="delivery-option-input" name="delivery-option-${item.productId}" value="499">
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
              <input type="radio" ${item.delivery === 999 ? "checked" : ""} class="delivery-option-input" name="delivery-option-${item.productId}" value="999">
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

  if(itemCounter === 1)
    document.querySelector('.js-counter').innerHTML = `${itemCounter} item`;
  else
    document.querySelector('.js-counter').innerHTML = `${itemCounter} items`;
    
  document.querySelector('.js-order-summary').innerHTML = cartHTML;

  cartFunctions();
  deliveryCalc();
};

//Calculating delivery costs + inserting them into HTML
const deliveryCalc = () => {
  let deliveryPrice = 0;

  cart.forEach((item) => {
    deliveryPrice += item.delivery;
  })
  
  let totalBefore = itemsPrice + deliveryPrice;
  let tax = totalBefore / 10;
  let total = totalBefore + totalBefore / 10;

  let summaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${itemCounter}):</div>
      <div class="payment-summary-money">$${parseFloat(itemsPrice / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${parseFloat(deliveryPrice / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${parseFloat(totalBefore / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${parseFloat(tax / 100).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${parseFloat(total / 100).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = summaryHTML;
}

//Saving current cart into sessionStorage when leaving
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('cart');
  sessionStorage.setItem('cart', JSON.stringify(cart));
});

orderSummary();
deliveryCalc();
