import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import MakeProductPrice from "../utilities/MakeProductPrice";
import CartProducts from "./CartProducts";
const Cart = () => {
  const history = useHistory();
  const {cartItems} = useSelector((state) => state.cart);
  const placeOrder = () => {
    history.push("/checkout");
  };

  if (!Object.keys(cartItems || {})?.length) {
    return <p className="text-lg p-5 text-red-600">Your Cart is Empty</p>;
  }

  return (
    <div className="space-x-3 p-3 h-minus_header_sm_dbl flex bg-gray-200">
      <div className="w-full bg-white  h-full overflow-y-auto">
        <div className="h-header border-b px-10 w-full flex items-center justify-between">
          <p className="font-semibold">My Cart</p>
          <p className="font-semibold">Deliver to</p>
        </div>
        <CartProducts />
        <div className="p-3 flex justify-end">
          <button
            onClick={placeOrder}
            className="focus:ring px-10 py-3 rounded bg-blue-500 text-white"
          >
            Place Order
          </button>
        </div>
      </div>

      <div className="w-96 h-full">
        <div className="bg-white">
          <div className="h-header border-b px-10 w-full flex items-center">
            <p className="font-semibold">Price</p>
          </div>
          <div className="p-3">
            <div className="flex justify-between my-3">
              <p>items ({MakeProductPrice(cartItems).items})</p>
              <p>
                Tk. {MakeProductPrice(cartItems).price.toLocaleString("en-US")}
              </p>
            </div>
            <div className="flex justify-between my-3">
              <p>Delivery Charge</p>
              <p className="text-green-500">Free</p>
            </div>
            <div className="border-t my-3"></div>
            <div className="flex justify-between my-3">
              <p className="font-semibold">Total Payable</p>
              <p className="font-semibold">
                Tk. {MakeProductPrice(cartItems).price.toLocaleString("en-US")}
              </p>
            </div>
            <p className="mt-5 text-sm font-semibold text-green-400">
              Your Total Saving on this order tk. 0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
