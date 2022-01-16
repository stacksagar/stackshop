import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get_orders} from "../../redux/actions/auth.action";
import Order from "./Order";

const Orders = () => {
  const dispatch = useDispatch();
  const {
    token,
    orders,
    order_fetched: fetched,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!fetched) {
      get_orders(dispatch);
    }
  }, [dispatch, fetched, token]);

  return (
    <div>
      {orders?.map((order) => (
        <Order key={order._id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
