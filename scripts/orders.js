try {
  const cartLoad = JSON.parse(sessionStorage.getItem('cart'));

  cartLoad.forEach(item => {
    cart.push(item);
  });
} catch(e) {};

let cartQuantity = 0;

cart.forEach((item) => {
  cartQuantity += item.quantity;
});

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;