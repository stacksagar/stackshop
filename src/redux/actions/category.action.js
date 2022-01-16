import axiosInstance from "../../helpers/axiosInstance";
import categoryTypes from "../types/category.types";
export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({type: categoryTypes.GET_CATEGORIES_REQUEST});
    try {
      const {
        data: {categories},
      } = await axiosInstance.get("/api/category/all");

      dispatch({
        type: categoryTypes.GET_CATEGORIES_SUCCESS,
        payload: {categories},
      });
    } catch (error) {
      dispatch({type: categoryTypes.GET_CATEGORIES_FAILED});
    }
  };
};
