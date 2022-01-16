import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signin_start} from "../../redux/actions/auth.action";
import CheckoutStep from "./CheckoutStep";

const LoginStep = ({...all}) => {
  const {user, authenticated, error, loading} = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({});

  const handle_form_state = (e) =>
    setFormState((prev) => ({...prev, [e.target.name]: e.target.value}));

  const signin_handler = (e) => {
    signin_start(dispatch, formState);
  };
  return (
    <CheckoutStep
      {...all}
      continue_button={signin_handler}
      loading={loading}
      buttonText="Login"
    >
      <div className="flex flex-col p-3">
        {authenticated ? (
          <div>
            <span className="mr-5 font-semibold text-sm">{user?.name}</span>
            <span>{user?.email}</span>
          </div>
        ) : (
          <>
            <p className="text-red-500 text-sm">{error}</p>
            <input
              className="bg-black text-white w-80 my-3 outline-none px-3 py-2 focus:ring rounded"
              onChange={handle_form_state}
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <input
              className="bg-black text-white w-80 outline-none px-3 py-2 focus:ring rounded"
              onChange={handle_form_state}
              name="password"
              type="password"
              placeholder="Password"
            />
          </>
        )}
      </div>
    </CheckoutStep>
  );
};

export default LoginStep;
