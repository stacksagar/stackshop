import {UserIcon} from "@heroicons/react/solid";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {signout} from "../../redux/actions/auth.action";
import MakeFirstLetterUP from "../utilities/MakeFirstLetterUP";

const Btn = ({text, ...props}) => (
  <button
    {...props}
    className="text-left w-full hover:bg-gray-200 focus:ring p-2 rounded-sm text-sm"
  >
    {text}
  </button>
);
const Authenticated = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <button className="flex items-center">
        <UserIcon className="w-4" />
        <span> {MakeFirstLetterUP(user?.name)} </span>
      </button>
      {open && (
        <div className="absolute top-5 m-1 ring w-32 -left-6 bg-white text-black rounded">
          <Btn text="Profile" />
          <Link to="/orders">
            <Btn text="Orders" />
          </Link>
          <Btn text="Peyment Status" />
          <Btn text="Signout" onClick={() => signout(dispatch)} />
        </div>
      )}
    </div>
  );
};

export default Authenticated;
