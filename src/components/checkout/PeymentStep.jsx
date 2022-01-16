import React, {useState} from "react";
import CheckoutStep from "./CheckoutStep";
import {useHistory} from "react-router-dom";
import {add_order} from "../../redux/actions/auth.action";
import {useDispatch, useSelector} from "react-redux";

const PeymentStep = ({setOrderState, ...all}) => {
  const {order_loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [peymentMethod, setPM] = useState("");
  const continue_handler = () => {
    setOrderState((p) => {
      add_order(
        dispatch,
        {
          ...p,
          peymentStatus: "pending",
          peymentMethod,
        },
        () => {
          history.push(`/orders`);
        }
      );
    });
  };

  return (
    <CheckoutStep
      {...all}
      continue_button={continue_handler}
      loading={order_loading}
      buttonText="Procced"
    >
      <div className="flex flex-col p-3">
        <label htmlFor="cod" className="flex items-center space-x-1">
          <span>Cash On Delivery</span>
          <input
            onChange={(e) => setPM(e.target.value)}
            type="radio"
            id="cod"
            name="cod"
            value="cash on delivery"
          />
        </label>
      </div>
    </CheckoutStep>
  );
};

export default PeymentStep;
