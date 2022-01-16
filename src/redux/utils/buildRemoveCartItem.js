export default function buildRemoveCartItem(items, itemID) {
  let obj = {...items};
  delete obj[itemID];
  return obj;
}
