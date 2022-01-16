import {ShoppingCartIcon} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {add_to_cart} from "../../redux/actions/cart.actions";

const ProductImages = ({product}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeImg, setActiveImg] = useState({});

  useEffect(() => {
    if (product?.images?.length) {
      setActiveImg({index: 0, image: product?.images[0].image});
    }
  }, [product]);

  function addToCart() {
    add_to_cart(dispatch, {
      ...product,
      quantity: 1,
    });
    history.push("/cart");
  }

  return (
    <div className="flex space-x-3">
      <div className="flex flex-col space-y-2">
        {product?.images.map((thump, i) => (
          <div
            onMouseEnter={() => setActiveImg({index: i, image: thump.image})}
            key={i}
            className={`w-14 h-14 flex items-center justify-center border p-1 ${
              activeImg?.index === i ? "border-black" : "hover:border-black"
            }`}
          >
            <img
              className="max-h-full max-w-full object-contain"
              alt=""
              src={thump.image}
            />
          </div>
        ))}
      </div>
      <div className="px-5">
        <div className="w-80 h-80 flex items-center justify-center">
          <img
            className="max-w-full max-h-full object-contain"
            src={activeImg?.image}
            alt=""
          />
        </div>

        <div className="flex justify-between space-x-3 mt-6">
          <button
            onClick={addToCart}
            className="focus:ring py-3 bg-yellow-500 text-white w-full flex items-center justify-evenly"
          >
            <ShoppingCartIcon className="w-4" />
            <span>ADD TO CART</span>
          </button>
          <button className="focus:ring py-3 bg-red-500 text-white w-full">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
