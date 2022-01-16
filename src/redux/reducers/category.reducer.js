import categoryTypes from "../types/category.types";
import buildNewCategories from "../utils/buildNewCategories";

const initState = {
  categories: [],
  loading: false,
  error: false,
  message: null,
  fetched: false,
};

const categoryReducer = (state = initState, {type, payload}) => {
  switch (type) {
    // Get Categories
    case categoryTypes.GET_CATEGORIES_REQUEST:
      return {...state, loading: true};

    case categoryTypes.GET_CATEGORIES_SUCCESS:
      return {...state, loading: false, fetched: true, ...payload};

    case categoryTypes.GET_CATEGORIES_FAILED:
      return {...state, loading: false, fetched: true};

    // Add Category
    case categoryTypes.ADD_CATEGORY_REQUEST:
      return {...state, loading: true};

    case categoryTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: payload.message,
        categories: buildNewCategories(state.categories, payload.category),
      };

    case categoryTypes.ADD_CATEGORY_FAILED:
      return {...state, loading: false, error: true, ...payload};

    default:
      return state;
  }
};

export default categoryReducer;
