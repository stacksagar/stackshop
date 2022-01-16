import productTypes from "../types/product.types";

const initState = {
  products: [],
  loading: false,
  error: false,
  message: null,
  fetched: false,
};

const productReducer = (state = initState, {type, payload}) => {
  switch (type) {
    // Get PRODUCTS
    case productTypes.GET_PRODUCTS_REQUEST:
      return {...state, loading: true};

    case productTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        fetched: true,
        ...payload,
      };

    case productTypes.GET_PRODUCTS_FAILED:
      return {...state, loading: false, fetched: true};

    // Add PRODUCT
    case productTypes.ADD_PRODUCT_REQUEST:
      return {...state, loading: true};

    case productTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: payload?.message,
        products: [...state.products, payload.product],
      };

    case productTypes.ADD_PRODUCT_FAILED:
      return {...state, loading: false, error: true, ...payload};

    default:
      return state;
  }
};

export default productReducer;
