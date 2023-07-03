//Loading cart from localStorage
try {
  const cartLoad = JSON.parse(sessionStorage.getItem('cart'));

  cartLoad.forEach(item => {
    cart.push(item);
  });
} catch(e) {};

//cartQuantity Init
let cartQuantity = 0;

cart.forEach((item) => {
  cartQuantity += item.quantity;
});

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

//Loading orders from sessionStorage
try {
  const orderLoad = JSON.parse(localStorage.getItem('order'));

  orderLoad.forEach(item => {
    order.push(item);
  });

  console.log(order);
} catch(e) {};

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let ordersHTML = '';

const orderFunctions = () => {

};

//Inserting order into HTML
order.forEach(subOrder => {
  //Creating delivery data objects
  const date = new Date(subOrder.orderDate);

  const dateFree = new Date(new Date().setDate(date.getDate() + 7));
  const dateFast = new Date(new Date().setDate(date.getDate() + 5));
  const dateFaster = new Date(new Date().setDate(date.getDate() + 1));

  ordersHTML += `
   <div class="order-container">
    <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${monthNames[date.getMonth()]} ${date.getDate()}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${subOrder.orderValue / 100}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${subOrder.orderId}</div>
        </div>
      </div>

      <div class="order-details-grid">
  `;

  subOrder.cart.forEach(item => {
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === item.productId) {
        matchingProduct = product;
      }
    });

    ordersHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${item.delivery === 0 ? `${monthNames[dateFree.getMonth()]} ${dateFree.getDate()}` : item.delivery === 499 ? `${monthNames[dateFast.getMonth()]} ${dateFast.getDate()}` : `${monthNames[dateFaster.getMonth()]} ${dateFaster.getDate()}`}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
    `;
  });

  ordersHTML += '</div></div>';
});

document.querySelector('.js-orders-grid').innerHTML = ordersHTML;