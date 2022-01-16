import React, {useState} from "react";
import {Link} from "react-router-dom";
import Input from "../utilities/Input";
import Button from "../utilities/Button";
import {signup_start} from "../../redux/actions/auth.action";
import {useDispatch, useSelector} from "react-redux";

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({});

  const handleFormState = (e) =>
    setFormState((prev) => ({...prev, [e.target.name]: e.target.value}));

  const signup_handler = (e) => {
    e.preventDefault();
    signup_start(dispatch, formState);
  };

  return (
    <div className=" min-h-minus_header py-10 flex items-center justify-center">
      <form
        onSubmit={signup_handler}
        className="max-w-screen-lg p-12 rounded bg-gray-900 ring-1"
      >
        <h1 className="text-red-300 text-lg">
          Create account an
          <span className="px-1 py-0.5 mx-1 text-sm rounded bg-white text-black">
            stack<b className="text-blue-500">shop</b>
          </span>
        </h1>
        <p className="text-xs text-red-500">{auth?.error}</p>

        <Input onChange={handleFormState} placeholder="Full Name" name="name" />
        <Input
          onChange={handleFormState}
          placeholder="Email"
          name="email"
          type="email"
        />
        <Input
          onChange={handleFormState}
          placeholder="New Password"
          name="password"
          type="password"
        />
        <p className="mb-3" />
        <Button text="Sign up" type="submit" loading={auth?.loading} />

        <p className="mt-6 text-white">
          already you have an account
          <Link to="/signin">
            <span className="text-blue-300 hover:underline ml-1">sign in.</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
