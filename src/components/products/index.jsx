import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import ScreenLoading from "../utilities/ScreenLoading";
import {StarIcon} from "@heroicons/react/solid";
import axiosInstance from "../../helpers/axiosInstance";
const Products = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [fp, setFp] = useState({min: 0, max: 99999});
  const [sort, setSort] = useState("");
  const [sortDir, setSortDir] = useState("Ascending");
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/product/category/${params?.category}`)
      .then((res) => res.data)
      .then(({products}) => {
        setProducts(products);
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    setShowProducts(products);
  }, [products]);

  function filterByPrice(e) {
    e.preventDefault();
    setShowProducts(() => {
      const {min, max} = fp;
      return products.filter((p) => {
        return p.price >= min && p.price <= max;
      });
    });
  }

  function sortBy() {
    const asc = sortDir === "Ascending";
    setShowProducts((prev) => {
      return prev.sort((a, b) => {
        switch (sort) {
          case "Price":
            return asc ? a.price - b.price : b.price - a.price;

          case "Name":
            return asc ? a.name - b.name : b.name - a.name;

          default:
            return prev;
        }
      });
    });
    setFp((p) => ({...p}));
  }

  if (loading) {
    return <ScreenLoading />;
  }

  if (!products || products?.length < 1) {
    return <div>Not Found!</div>;
  }
  return (
    <div className="flex justify-between">
      <div className="w-96 h-minus_header_sm_dbl flex flex-col space-y-4 bg-gray-100 overflow-y-auto">
        <div className="w-full h-header bg-gray-50 px-3 flex justify-between items-center">
          <p className="text-sm">Filter Products</p>
        </div>

        <form onSubmit={filterByPrice} className="p-3">
          <p>Filter By Price</p>
          <div className="flex justify-between space-x-1">
            <input
              value={fp?.min}
              onChange={(e) => {
                e.target.value > 0 &&
                  setFp((p) => ({...p, min: e.target.value}));
              }}
              className="w-24 text-sm p-1 outline-none rounded-sm focus:ring bg-gray-900 text-white"
              type="number"
              placeholder="min"
            />
            to
            <input
              value={fp?.max}
              onChange={(e) => {
                e.target.value > 0 &&
                  setFp((p) => ({...p, max: e.target.value}));
              }}
              className="w-24 text-sm p-1  outline-none rounded-sm focus:ring bg-gray-900 text-white"
              type="number"
              placeholder="max"
            />
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white focus:ring px-2 py-1 rounded text-sm"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="p-3">
          <p>Sort By</p>
          <div className="flex justify-between">
            <select
              onChange={(e) => setSort(e.target.value)}
              className="w-1/2 h-8 bg-gray-900 text-white outline-none focus:ring"
            >
              <option value="" className="text-gray-500">
                Select
              </option>
              <option value="Price">Price</option>
              <option value="Name">Name</option>
            </select>
            <div className="flex flex-col items-end">
              <label
                className="flex space-x-1 items-center"
                htmlFor="Ascending"
              >
                <span>Ascending</span>
                <input
                  name="sort"
                  type="radio"
                  onChange={(e) => setSortDir(e.target.id)}
                  id="Ascending"
                />
              </label>
              <label
                className="flex space-x-1 items-center"
                htmlFor="Descending"
              >
                <span>Descending</span>
                <input
                  name="sort"
                  type="radio"
                  onChange={(e) => setSortDir(e.target.id)}
                  id="Descending"
                />
              </label>
            </div>
          </div>
          <div className="flex mt-2 justify-end">
            <button
              onClick={sortBy}
              type="submit"
              className="bg-blue-500 text-white focus:ring px-2 py-1 rounded text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-minus_header_sm_dbl overflow-y-auto grid grid-cols-12 grid-rows-auto bg-gray-200 gap-5 p-5">
        {showProducts?.map((p) => (
          <div
            key={p._id}
            className="col-span-3 row-span-auto bg-white p-2 flex flex-col justify-evenly space-y-2"
          >
            <Link to={`/${p?.name.split(" ").join("-")}/${p?._id}`}>
              <img className="w-12 mx-auto" src={p.images[0].image} alt="" />
            </Link>
            <p className="text-sm justify-center flex">
              <span className="font-semibold">
                Tk. {p.price.toLocaleString("en-US")}
              </span>
              <span className="text-xs ml-1 px-1 py-0.5 bg-green-500 text-white rounded flex items-center space-x-1">
                <small>4.4</small> <StarIcon className="w-2" />
              </span>
            </p>
            <Link key={p._id} to={`/${p?.name.split(" ").join("-")}/${p?._id}`}>
              <p className="text-xs text-center">{p.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
