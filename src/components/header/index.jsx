import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {SearchIcon, ShoppingCartIcon} from "@heroicons/react/solid";
import Authenticated from "./Authenticated";

const Header = () => {
  const {authenticated} = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    alert(`searching... ${searchTerm}`);
  };

  return (
    <header className="flex w-full h-header bg-blue-600 items-center justify-around">
      <Link to="/">
        <p className="px-3 py-1 rounded bg-white font-semibold text-black shadow-xl ">
          stack<span className="text-blue-700">shop</span>
        </p>
      </Link>

      <form onSubmit={searchHandler} className="relative w-96 ">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-9 pl-3 pr-8 w-full text-sm rounded outline-none focus:ring-1 ring-black text-black focus:bg-gray-100 bg-white"
          type="search"
          placeholder="Search products, brands & more..."
        />
        <button type="submit">
          <SearchIcon className="w-4 absolute inset-y-0 right-2 my-auto text-black" />
        </button>
      </form>

      <nav className="flex items-center space-x-7 text-white">
        {authenticated ? (
          <Authenticated />
        ) : (
          <>
            <Link to="/signin">Signin</Link>
          </>
        )}
        <Link to="/cart">
          <p className="flex space-x-1">
            <ShoppingCartIcon className="w-5" />
            <span>Cart</span>
          </p>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
