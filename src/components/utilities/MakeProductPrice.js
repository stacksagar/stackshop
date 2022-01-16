export default function MakeProductPrice(cartItems) {
  let items = 0;
  let price = 0;
  price = Object.values(cartItems)
    .map((item) => item)
    .reduce((acc, item) => {
      items += item.quantity;
      return acc + item.quantity * item.price;
    }, 0);

  return {items, price};
}
