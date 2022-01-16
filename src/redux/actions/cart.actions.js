import cartTypes from "../types/cart.types";
import store from "../store";
import axiosInstance from "../../helpers/axiosInstance";
import axios from "axios";

export const add_to_cart = async (dispatch, item) => {
  const {
    cart: {cartItems},
    auth: {authenticated},
  } = store.getState();

  if (authenticated) {
    const {
      data: {cart},
    } = await axiosInstance.post("/api/cart/add-to-cart", {
      cartItem: {
        product: item._id,
        quantity: 1,
      },
    });
    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: {cartItems: cart?.cartItems},
    });
  } else {
    let newItems;
    if (cartItems[item._id]) {
      const quantity = cartItems[item._id].quantity + 1;
      newItems = {...cartItems, [item._id]: {...item, quantity}};
    } else {
      newItems = {...cartItems, [item._id]: item};
    }
    localStorage.setItem("cart", JSON.stringify(newItems));
    dispatch({type: cartTypes.ADD_TO_CART, payload: {cartItems: newItems}});
  }
};

export const update_cart_quantity = async (
  dispatch,
  id,
  quantity,
  edit,
  minus
) => {
  const {
    auth: {authenticated},
    cart: {cartItems},
  } = store.getState();
  if (authenticated) {
    const {
      data: {cart},
    } = await axiosInstance.post("/api/cart/add-to-cart", {
      cartItem: {
        product: id,
        quantity,
        edit: edit || false,
        minus: minus || false,
      },
    });

    dispatch({
      type: cartTypes.ADD_TO_CART,
      payload: {cartItems: cart.cartItems},
    });
  } else {
    cartItems[id].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    dispatch({type: cartTypes.ADD_TO_CART, payload: {cartItems}});
  }
};

export const update_cart = async (dispatch) => {
  const {
    auth: {token, authenticated},
  } = store.getState();
  if (authenticated) {
    const res = await axios.get("http://localhost:1000/api/cart/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.data;
    dispatch({
      type: cartTypes.UPDATE_CART,
      payload: {cartItems: data?.cart?.cartItems},
    });
  } else {
    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;
    if (cartItems) {
      dispatch({type: cartTypes.UPDATE_CART, payload: {cartItems}});
    }
  }
};

export const remove_cart_item = (dispatch, id) => {
  dispatch({type: cartTypes.REMOVE_CART_ITEM, payload: {id}});
  axiosInstance
    .put(`/api/cart/${id}`)
    .then((res) => console.log(res.data))
    .catch(console.log);
};
