import React from "react";
import {Link} from "react-router-dom";

const Order = ({order}) => {
  return (
    <div className="bg-gray-200 text-gray-900 ring rounded m-5">
      <div className="h-header w-full bg-gray-500 text-white flex justify-between space-x-1 items-center px-5">
        <b>YOUR ORDER</b>
        <p className="text-blue-200 underline">
          <Link to={`/orders/track-order/${order?._id}`}>Track Your Order</Link>
        </p>
      </div>

      <div className="flex justify-between">
        <div className="p-5 flex flex-col space-y-4">
          <p>
            <b>Reciever Name: </b>
            <span>{order?.address.name}</span>
          </p>
          <p>
            <b>Total Price: </b>
            <span>{(order?.amount).toLocaleString("en-US")} Tk.</span>
          </p>
          <p>
            <b>Peyment Status: </b>
            <span>{order?.peymentStatus}</span>
          </p>
          <p>
            <b>Peyment Method: </b>
            <span>{order?.peymentMethod}</span>
          </p>
        </div>
        <div className="p-5">
          <p className="font-semibold border-b mb-2 w-44">Order Products</p>
          {order?.items.map((item) => (
            <Link
              key={item._id}
              to={`/${item?.product?.name?.split(" ").join("-")}/${
                item?.product?._id
              }`}
            >
              <div className="flex space-x-3 mb-5">
                <img
                  className="w-12"
                  src={item?.product?.images[0]?.image}
                  alt=""
                />
                <div className="flex flex-col space-y-3">
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-sm font-semibold">
                    Tk. {item?.product?.price?.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
