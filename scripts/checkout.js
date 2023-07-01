window.onload = () => {
  let cartLoad = JSON.parse(sessionStorage.getItem('cart'));

  cartLoad.forEach(item => {
    cart.push(item);
  });

  console.log(cart);
}