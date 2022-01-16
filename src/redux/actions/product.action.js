import axiosInstance from "../../helpers/axiosInstance";
import productTypes from "../types/product.types";

export const get_products_start = async (dispatch, categoryID) => {
  dispatch({type: productTypes.GET_PRODUCTS_REQUEST});
  try {
    const {data} = await axiosInstance.get(
      `/api/product/category/${categoryID}`
    );
    if (data?.error) throw new Error("something wrong");
    dispatch({
      type: productTypes.GET_PRODUCTS_SUCCESS,
      payload: {products: data.products},
    });
    return data.products;
  } catch (error) {
    dispatch({
      type: productTypes.ADD_PRODUCT_FAILED,
      payload: {
        message: typeof error === "object" ? JSON.stringify(error) : "" + error,
      },
    });
  }
};
