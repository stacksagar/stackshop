import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Input from "../utilities/Input";
import Button from "../utilities/Button";
import {useDispatch, useSelector} from "react-redux";
import {signin_start} from "../../redux/actions/auth.action";
import {useHistory} from "react-router";

const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (auth.authenticated) {
      history.replace("/");
    }
  }, [auth, history]);

  const handle_form_state = (e) =>
    setFormState((prev) => ({...prev, [e.target.name]: e.target.value}));

  const signin_handler = (e) => {
    e.preventDefault();
    signin_start(dispatch, formState);
  };

  return (
    <div className="h-minus_header_sm_dbl flex items-center justify-center">
      <form
        onSubmit={signin_handler}
        className="max-w-screen-lg p-12 rounded bg-gray-900 ring-1"
      >
        <h1 className="text-red-300 text-lg">
          Sign in to
          <span className="px-1 py-0.5 mx-1 text-sm rounded bg-white text-black">
            stack<b className="text-blue-500">shop</b>
          </span>
        </h1>
        <p className="text-xs text-red-500">{auth?.error}</p>
        <Input
          onChange={handle_form_state}
          placeholder="Email"
          name="email"
          type="email"
        />
        <Input
          onChange={handle_form_state}
          placeholder="Password"
          name="password"
          type="password"
        />
        <a href="/" className="mt-1 mb-3 inline-block text-xs text-blue-400">
          Forgot Password
        </a>
        <Button text="Sign in" type="submit" loading={auth?.loading} />

        <p className="mt-6 text-white">
          you haven't an account
          <Link to="/signup">
            <span className="text-blue-300 hover:underline mx-1">sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
