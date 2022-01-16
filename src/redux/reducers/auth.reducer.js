import authTypes from "../types/auth.types";

const initialState = {
  user: null,
  error: null,
  loading: false,
  authenticated: false,
  token: null,
  orders: [],
  order_error: null,
  order_fetched: false,
  order_loading: false,
};

const authState = {...initialState};
const authReducer = (state = authState, action) => {
  const {type, payload} = action;

  switch (type) {
    // Signin Steps 👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
    case authTypes.RESET_ERROR:
      return {...state, error: null};

    case authTypes.SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case authTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        ...payload,
      };

    case authTypes.SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        authenticated: false,
        ...payload,
      };

    // Signup Steps  👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
    case authTypes.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case authTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        ...payload,
      };

    case authTypes.SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        authenticated: false,
        ...payload,
      };

    case authTypes.GET_ORDERS_REQUEST:
      return {...state, order_loading: true};
    case authTypes.GET_ORDERS_FAILED:
      return {...state, order_error: payload.error, order_loading: false};
    case authTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders,
        order_loading: false,
        order_fetched: true,
        order_error: null,
      };

    case authTypes.ADD_ORDER_REQUEST:
      return {...state, order_loading: true};
    case authTypes.ADD_ORDER_FAILED:
      return {...state, order_error: payload.error, order_loading: false};
    case authTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, payload.order],
        order_loading: false,
        order_fetched: true,
        order_error: null,
      };

    // Signout Steps   👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
    case authTypes.SIGNOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
