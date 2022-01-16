import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import MakeProductPrice from "../utilities/MakeProductPrice";
import CheckoutSteps from "./CheckoutSteps";

const Checkout = () => {
  const {cartItems} = useSelector((state) => state.cart);
  const [orderState, setOrderState] = useState({});

  useEffect(() => {
    setOrderState((p) => ({
      ...p,
      amount: MakeProductPrice(cartItems).price,
      items: Object.values(cartItems).map((item) => ({
        product: item._id,
        price: item.price,
        quantity: item.quantity,
      })),
    }));
  }, [cartItems]);

  return (
    <div className="space-x-3 p-3 h-minus_header_sm_dbl flex bg-gray-200">
      <CheckoutSteps orderState={orderState} setOrderState={setOrderState} />

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

export default Checkout;
