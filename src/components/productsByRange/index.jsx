import React, {useEffect, useState} from "react";
import axiosInstance from "../../helpers/axiosInstance";
import ProductsSlider from "../utilities/ProductsSlider";

const ProductByRange = (props) => {
  const slug = props?.match.params.slug;
  const [allProducts, setAllProducts] = useState({
    products: [],
    productsByRange: {},
  });

  const titles = {
    under10k: "under 10,000tk",
    under15k: "under 15,000tk",
    under20k: "under 20,000tk",
  };
  useEffect(() => {
    console.log(allProducts);
  }, [allProducts]);
  useEffect(() => {
    axiosInstance
      .get(`/api/product/bycategory/${slug}`)
      .then((res) =>
        setAllProducts({
          products: res.data?.products,
          productsByRange: res.data?.productsByRange,
        })
      )
      .catch(console.log);
  }, [slug]);

  if (!allProducts.products?.length) {
    return <h1 className="p-12">Empty</h1>;
  }

  return (
    <div className="bg-gray-200 p-12 w-full flex flex-col space-y-12">
      {allProducts.productsByRange &&
        Object.entries(allProducts.productsByRange).map(([key, products]) => (
          <ProductsSlider
            key={key}
            products={products}
            title={"Samsung Mobiles " + titles[key]}
          />
        ))}
    </div>
  );
};

export default ProductByRange;
