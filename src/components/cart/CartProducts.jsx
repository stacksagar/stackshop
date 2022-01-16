import React from "react";
import {useSelector} from "react-redux";
import SingleItem from "./SingleItem";

const CartProducts = () => {
  const {cartItems} = useSelector((state) => state.cart);
  return (
    <div className="w-full p-3 flex flex-col space-y-5">
      {Object.keys(cartItems).map((key) => (
        <SingleItem key={key} item={cartItems[key]} id={key} />
      ))}
    </div>
  );
};

export default CartProducts;
