export default function buildNewCartItems(items, item) {
  if (items[item._id]) {
    const quantity = items[item._id].quantity + 1;
    return {...items, [item._id]: {...item, quantity}};
  }

  return {...items, [item._id]: item};
}
