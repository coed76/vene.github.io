function checkout() {
  // Generar los detalles de la compra a partir del carrito
  const purchaseDetails = cart.map(item => `${item.item} - $${item.price} USD`).join('\n');

  // Redirigir al usuario a Paypal con los detalles de la compra
  window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=servpaypa3@gmail.com&item_name=${encodeURIComponent(purchaseDetails)}&amount=${cart.reduce((total, item) => total + item.price, 0)}&currency_code=USD`;
}
