import React, {useEffect, useState} from "react";
import axiosInstance from "../../helpers/axiosInstance";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ScreenLoading from "../utilities/ScreenLoading";
const SingleProduct = (props) => {
  const {productId} = props?.match.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/product/${productId}`)
      .then((res) => {
        setLoading(false);
        setProduct({...res.data?.product});
      })
      .catch(console.log);
  }, [productId]);

  if (loading) {
    return <ScreenLoading />;
  }

  if (Object.values(product).length < 1) {
    return <div className="p-5 text-red-600">Product Not Found!</div>;
  }

  return (
    <div className="w-full flex justify-between p-5">
      <ProductImages product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default SingleProduct;
