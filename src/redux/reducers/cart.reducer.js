import cartTypes from "../types/cart.types";
import buildRemoveCartItem from "../utils/buildRemoveCartItem";

const initialState = {
  cartItems: {},
  loading: false,
  fetched: false,
};

export default function cartReducer(state = initialState, actions) {
  const {type, payload} = actions;

  switch (type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: payload.cartItems,
      };

    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: buildRemoveCartItem(state.cartItems, payload.id),
      };

    case cartTypes.UPDATE_CART:
      return {
        ...state,
        fetched: true,
        cartItems: payload.cartItems,
      };

    default:
      return state;
  }
}
