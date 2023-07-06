const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let trackingProduct;

//Loading cart from sessionStorage
try {
  const cartLoad = JSON.parse(sessionStorage.getItem('cart'));

  cartLoad.forEach(item => {
    cart.push(item);
  });

  trackingProduct = JSON.parse(sessionStorage.getItem('item'));
} catch(e) {};

//cartQuantity Init
let cartQuantity = 0;

cart.forEach((item) => {
  cartQuantity += item.quantity;
});

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

//Showing currently tracking item
let matchingItem;

const findProduct = () => {
  products.forEach(item => {
    if(item.id === trackingProduct.productId) {
      matchingItem = item;
    }
  });
};

findProduct();

const date = new Date(trackingProduct.arrivingDate);

document.querySelector('.js-delivery-date').innerHTML = `
  Arriving on ${date.toLocaleDateString("en-US", { weekday: 'long' })}, ${monthNames[date.getMonth()]} ${date.getDate()}
`;

document.querySelector('.js-product-info').innerHTML = `${matchingItem.name}`;

document.querySelector('.js-product-quantity').innerHTML = `Quantity: ${trackingProduct.quantity}`;

document.querySelector('.js-product-img').innerHTML = `
  <img class="product-image" src="${matchingItem.image}">
`;