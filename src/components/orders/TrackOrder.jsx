import {CheckIcon} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axiosInstance from "../../helpers/axiosInstance";
import dateFormatter from "../utilities/dateFormatter";

const TrackOrder = (props) => {
  const [running, setRunning] = useState(0);
  const [order, setOrder] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/api/order/${props.match.params.id}`)
      .then((res) => setOrder(res.data.order))
      .catch(console.log);
  }, [props]);

  useEffect(() => {
    if (Object.keys(order || {}).length > 1) {
      order?.orderStatus.map((status, i) => {
        if (status.isCompleted) {
          setRunning(i + 1);
        }
        return null;
      });
    }
  }, [order]);
  if (!order)
    return <div className="m-5 text-lg text-red-500">Order Not Found!</div>;

  if (Object.keys(order || {}).length < 1)
    return <div className="m-5 text-lg text-green-500">Loading</div>;

  return (
    <div className="bg-gray-200 text-gray-900 ring rounded m-5">
      <div className="h-header w-full bg-gray-400 text-white flex space-x-1 items-center px-5">
        <b>Track Your Order</b>
      </div>

      <div className="flex justify-center px-10 py-16">
        {order?.orderStatus.map((status, i) => {
          if (i === 0) {
            return (
              <div
                key={status._id}
                className="-mr-7 flex flex-col items-center"
              >
                <p>{status.type}</p>
                <div className="h-2 z-30 my-3 flex items-center justify-start">
                  <div
                    className={`bg-green-600 text-white w-6 h-6  rounded-full flex items-center justify-center`}
                  >
                    <CheckIcon className="w-3" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold">
                    {dateFormatter(status.date[0])}
                  </p>
                  <p className="text-xs">{status.date[1]}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={status._id}
                className=" w-1/4 flex flex-col justify-start items-center"
              >
                <p className="w-full text-right">{status.type}</p>
                <div
                  className={`${
                    status.isCompleted ? "bg-green-600" : "bg-gray-300"
                  } ${
                    running === i && "animate-pulse "
                  } w-full h-2 my-3 flex items-center justify-end`}
                >
                  <div
                    className={`${
                      status.isCompleted ? "bg-green-600" : "bg-gray-300"
                    } w-6 h-6  rounded-full flex items-center justify-center`}
                  >
                    {status.isCompleted && (
                      <CheckIcon className="w-3 text-white" />
                    )}
                    {running === i && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                {status.isCompleted && (
                  <div className="w-full text-right">
                    <p className="text-xs font-semibold">
                      {dateFormatter(status.date[0])}
                    </p>
                    <p className="text-xs">{status.date[1]}</p>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
      <div className="flex justify-between">
        <div className="p-5 flex flex-col space-y-4">
          <p className="font-bold border-b w-44">Delivery Address</p>
          <p>
            <span className="font-semibold">Name: </span> {order?.address.name}
          </p>
          <p>
            <span className="font-semibold">District/City: </span>{" "}
            {order?.address.address}
          </p>
          <p className="font-semibold">Phone: {order?.address.number}</p>
        </div>
        <div className="p-5">
          <p className="font-semibold border-b mb-2 w-44">Order Products</p>
          {order?.items.map((item) => (
            <Link
              key={item._id}
              to={`/${item?.product?.name.split(" ").join("-")}/${
                item?.product?._id
              }`}
            >
              <div className="flex space-x-3 mb-5">
                <img
                  className="w-12"
                  src={item.product.images[0].image}
                  alt=""
                />
                <div className="flex flex-col space-y-3">
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-sm font-semibold">
                    Tk. {item.product.price?.toLocaleString("en-US")}
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

export default TrackOrder;
