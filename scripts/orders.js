//Loading cart from sessionStorage
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
  const orderLoad = JSON.parse(sessionStorage.getItem('order'));

  orderLoad.forEach(item => {
    order.push(item);
  });

  console.log(order);
} catch(e) {};