import {StarIcon} from "@heroicons/react/solid";
import React from "react";

const ProductDetails = ({product}) => {
  return (
    <div className="w-full flex flex-col px-6 space-y-3">
      <p>{product?.name}</p>
      <div className="flex space-x-2 items-center">
        <p className="bg-green-500 text-white px-2 py-1 text-xs rounded flex space-x-1">
          <span>4.4</span>
          <StarIcon className="w-3" />
        </p>
        <span className="text-green-500 text-xs">1243</span>
      </div>
      <p className="text-xs text-green-500">Extra 499tk of</p>
      <p className="flex items-center space-x-2">
        <span className="text-2xl font-semibold">
          {product?.price?.toLocaleString("en-US")} tk
        </span>
        <span className="text-xs"> 9% of </span>
      </p>
      <p className="font-semibold text-lg text-gray-500">Available Offers</p>
        <div className="flex space-x-2 text-gray-800">
          <p className="font-semibold">Description:</p>
          <p>{product.description == 'undefined' ? 'Empty' : product.description }</p>
        </div> 
    </div>
  );
};

export default ProductDetails;
