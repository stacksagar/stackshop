import {PencilIcon, CheckCircleIcon} from "@heroicons/react/solid";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {
  remove_cart_item,
  update_cart_quantity,
} from "../../redux/actions/cart.actions";

const SingleItem = ({id, item}) => {
  const dispatch = useDispatch();

  const formRef = useRef();
  const [showEdit, setShowEdit] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    setQuantity(item?.quantity);
  }, [item]);

  function updateCartQuantity(edit, qty, minus) {
    update_cart_quantity(dispatch, item._id, qty || quantity, edit, minus);
  }

  function RemoveCartItem() {
    remove_cart_item(dispatch, id);
  }

  return (
    <div className="border p-3 bg-gray-50">
      <div className="w-full flex">
        <div className="w-24 h-24">
          <img
            className="max-w-full max-h-full"
            src={item?.images[0].image}
            alt=""
          />
        </div>
        <div className="flex flex-col w-full justify-start">
          <div className="flex  w-full justify-between">
            <p>{item?.name}</p>
            <p className="w-64 text-sm text-gray-500 text-right">
              Delivery in 3-5 days
            </p>
          </div>
          <p className="mt-1 text-sm text-pink-700">Tk. {item?.price}</p>
        </div>
      </div>
      <div
        onMouseEnter={() => setShowEditIcon(true)}
        onMouseLeave={() => setShowEditIcon(false)}
        className="flex space-x-4 items-center p-3"
      >
        <div className="flex space-x-2">
          <button
            disabled={quantity === 1}
            onClick={() => updateCartQuantity(false, 1, true)}
            className="w-6 h-6 text-sm flex items-center justify-center rounded-full border"
          >
            -
          </button>
          <div className="relative">
            {showEdit ? (
              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowEdit((prev) => !prev);
                  updateCartQuantity(true);
                }}
              >
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    if (Number(e.target.value) > 0) {
                      setQuantity(Number(e.target.value));
                    }
                  }}
                  className="w-12 h-6 border flex items-center justify-center text-xs rounded outline-none text-center"
                />
              </form>
            ) : (
              <p className="w-12 h-6 border flex items-center justify-center text-xs text-center">
                {quantity}
              </p>
            )}
            {showEditIcon && (
              <div
                onClick={() => setShowEdit((prev) => !prev)}
                className="absolute -right-3 -top-3 cursor-pointer"
              >
                {showEdit ? (
                  <button
                    onClick={() => {
                      setShowEdit((prev) => !prev);
                      updateCartQuantity(true);
                    }}
                  >
                    <CheckCircleIcon className="w-5" />
                  </button>
                ) : (
                  <PencilIcon className="w-4" />
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => updateCartQuantity(false, 1)}
            className="w-6 h-6 text-sm flex items-center justify-center rounded-full border"
          >
            +
          </button>
        </div>
        <button className="font-semibold text-sm cursor-pointer text-gray-800">
          SAVE FOR LATER
        </button>
        <button
          onClick={RemoveCartItem}
          className="font-semibold text-sm cursor-pointer text-gray-800"
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
