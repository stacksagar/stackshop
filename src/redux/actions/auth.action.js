import axiosInstance from "../../helpers/axiosInstance";
import types from "../types/auth.types";
import cartTypes from "../types/cart.types";

const errorHandler = (dispatch, error) => {
  dispatch({
    type: types.SIGNIN_FAILED,
    payload: {error},
  });
  setTimeout(() => {
    dispatch({type: types.RESET_ERROR});
  }, 900);
};

export const signin_start = async (dispatch, info) => {
  dispatch({type: types.SIGNIN_REQUEST});
  try {
    const {
      data: {success, error, user, token},
    } = await axiosInstance.post("/api/auth/signin", info);
    if (error || !success) throw new Error(error);
    dispatch({type: types.SIGNIN_SUCCESS, payload: {user, token}});
    localStorage.setItem("token", token);
  } catch (error) {
    errorHandler(dispatch, error.message);
  }
};

export const signup_start = async (dispatch, info) => {
  dispatch({type: types.SIGNIN_REQUEST});
  try {
    const {
      data: {success, error, user, token},
    } = await axiosInstance.post("/api/auth/signup", info);
    if (error || !success) throw new Error(error);
    dispatch({type: types.SIGNIN_SUCCESS, payload: {user, token}});
    localStorage.setItem("token", token);
  } catch (error) {
    errorHandler(dispatch, error.message);
  }
};

export const get_orders = async (dispatch) => {
  dispatch({type: types.GET_ORDERS_REQUEST});
  try {
    const {
      data: {success, error, orders},
    } = await axiosInstance.get("/api/order/user", {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
    });
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: types.GET_ORDERS_SUCCESS, payload: {orders}});
  } catch (error) {
    dispatch({
      type: types.GET_ORDERS_FAILED,
      payload: {error: error.message},
    });
  }
};
export const add_order = async (dispatch, state, afterSuccess) => {
  dispatch({type: types.ADD_ORDER_REQUEST});
  try {
    const {
      data: {success, error, order},
    } = await axiosInstance.post("/api/order/create", state);
    if (error || !success) throw new Error(error || "something wrong!");
    dispatch({type: types.ADD_ORDER_SUCCESS, payload: {order}});
    afterSuccess();
    dispatch({type: cartTypes.UPDATE_CART, payload: {cartItems: {}}});
    await axiosInstance.delete("/api/cart");
  } catch (error) {
    dispatch({
      type: types.ADD_ORDER_FAILED,
      payload: {error: error.message},
    });
  }
};

export const signout = (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch({type: types.SIGNOUT});
  dispatch({type: cartTypes.UPDATE_CART, payload: {cartItems: {}}});
};

export const is_loggedin = async (dispatch) => {
  try {
    const {
      data: {success, token, user},
    } = await axiosInstance.get("/api/auth/user");
    if (!success) throw new Error("something wrong!");
    dispatch({type: types.SIGNIN_SUCCESS, payload: {user, token}});
  } catch (error) {
    errorHandler(dispatch, error.message);
  }
};
