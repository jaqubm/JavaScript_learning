const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

//Creating delivery data objects
const dateFree = new Date(new Date().setDate(new Date().getDate() + 7));
const dateFast = new Date(new Date().setDate(new Date().getDate() + 5));
const dateFaster = new Date(new Date().setDate(new Date().getDate() + 1));

let itemCounter = 0;
let itemsPrice = 0;

const cartFunctions = () => {
  cart.forEach((item) => {
    //Choosing delivery options
    if(document.querySelector(`input[name="delivery-option-${item.productId}"]`)) {
      document.querySelectorAll(`input[name="delivery-option-${item.productId}"]`).forEach((element) => {
        element.addEventListener('change', (event) => {
          item.delivery = Number(event.target.value);
          orderSummary();
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
          Delivery date: 
          ${item.delivery === 0 ? `${dateFree.toLocaleDateString("en-US", { weekday: 'long' })}, ${monthNames[dateFree.getMonth()]} ${dateFree.getDate()}` : item.delivery === 499 ? `${dateFast.toLocaleDateString("en-US", { weekday: 'long' })}, ${monthNames[dateFast.getMonth()]} ${dateFast.getDate()}` : `${dateFaster.toLocaleDateString("en-US", { weekday: 'long' })}, ${monthNames[dateFaster.getMonth()]} ${dateFaster.getDate()}`}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src=${matchingProduct.image}>

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${matchingProduct.priceCents / 100}</div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
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
                  ${dateFree.toLocaleDateString("en-US", { weekday: 'long' })}, ${monthNames[dateFree.getMonth()]} ${dateFree.getDate()}
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
                  ${dateFast.toLocaleDateString("en-US", { weekday: 'long' })}, ${monthNames[dateFast.getMonth()]} ${dateFast.getDate()}
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
                  ${dateFaster.toLocaleDateString("en-US", { weekday: 'long' })}, ${monthNames[dateFaster.getMonth()]} ${dateFaster.getDate()}
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
  
  let totalBefore = Math.round(itemsPrice + deliveryPrice);
  let tax = Math.round(totalBefore / 10);
  let total = Math.round(totalBefore + totalBefore / 10);

  let summaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${itemCounter}):</div>
      <div class="payment-summary-money">$${itemsPrice / 100}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${deliveryPrice / 100}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${totalBefore / 100}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${tax / 100}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${total / 100}</div>
    </div>

    <button class="place-order-button button-primary" onclick="placeOrder()">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = summaryHTML;
}

//Saving current cart into sessionStorage when leaving
window.addEventListener('unload', () => {
  sessionStorage.removeItem('cart');
  sessionStorage.setItem('cart', JSON.stringify(cart));
});

orderSummary();
deliveryCalc();

function createUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

//Placing order
const placeOrder = () => {
  if(cart.length > 0) {
    //Loading orders from localStorage
    try {
      const orderLoad = JSON.parse(localStorage.getItem('order'));
  
      while(order.length > 0) 
        order.pop();
  
      orderLoad.forEach(item => {
        order.push(item);
      });
    } catch(e) {};

    //Calculating deliveryPrice
    let deliveryPrice = 0;

    cart.forEach((item) => {
      deliveryPrice += item.delivery;
    })
    
    //Calculating orderValue
    let total = Math.round((itemsPrice + deliveryPrice) * 1.1);

    //Generating orderId
    let orderId = createUUID();

    for(let i=0; i<order.length; i++) {
      if(order[i].orderId === orderId) {
        orderId = createUUID();
        i = 0;
      }
    }

    //Creating date object
    const date = new Date();

    //Adding order to order list
    order.push({
      orderDate: date,
      orderId: orderId,
      orderValue: total,
      cart: cart
    });

    //Saving order in localStorage
    localStorage.removeItem('order');
    localStorage.setItem('order', JSON.stringify(order));

    //Cleaning up cart
    while(cart.length > 0) 
      cart.pop();

    orderSummary();
  }
}
