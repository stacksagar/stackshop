import {useRef, useState} from "react";
import Button from "./Button";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
} from "@heroicons/react/solid";
import {Link} from "react-router-dom";

const SliderProduct = ({p}) => (
  <Link to={`/${p?.name.split(" ").join("-")}/${p?._id}`}>
    <div
      style={{minWidth: "220px", minHeight: "150px"}}
      className={`SliderProduct text-black text-center bg-white rounded-sm flex flex-col justify-between items-center space-y-2`}
    >
      <img className="h-56" src={p?.images[0]?.image} alt="" />
      <p className="text-sm overflow-hidden flex items-center">{p?.name}</p>
      <div className="flex space-x-2 items-center">
        <p className="bg-green-500 text-white px-2 py-1 text-xs rounded flex space-x-1">
          <span>4.{Math.floor(Math.random() * 9)}</span>
          <StarIcon className="w-3" />
        </p>
        <span className="text-green-500 text-xs">
          ({Math.floor(Math.random() * 11000)})
        </span>
      </div>
      <p>{(p?.price).toLocaleString("en-US")} tk</p>
    </div>
  </Link>
);

export default function ProductsSlider({products, title}) {
  const sliderValue = useRef();
  const [activeChevron, setActiveChevron] = useState("right");
  const clickHandler = (action, active) => {
    setActiveChevron(active);
    if (action === "+") {
      return (sliderValue.current.scrollLeft +=
        sliderValue.current.clientWidth + 20);
    }
    return (sliderValue.current.scrollLeft -=
      sliderValue.current.clientWidth + 20);
  };

  return (
    <div
      className={`w-full 2xl:max-w-4xl pb-3 shadow-lg bg-white space-y-2 group relative`}
    >
      {/* Slider Header Text */}
      <div className="flex items-center justify-between p-3 border-b">
        <p className="text-black">{title}</p>
        <Link to={`/products/${products[0].category._id}`}>
          <Button text="View All" />
        </Link>
      </div>

      <div
        style={{transition: "all 1s"}}
        ref={sliderValue}
        className="scrollHandle w-full bg-white flex overflow-x-auto overflow-y-hidden py-2"
      >
        {activeChevron === "left" && (
          <button
            style={{boxShadow: "3px 0px 6px 3px #ddd"}}
            onClick={() => clickHandler("-", "right")}
            className="z-20 absolute inset-y-0 my-auto w-12 h-28 left-0 flex items-center justify-center bg-white shadow opacity-0 group-hover:opacity-100 font-serif font-bold text-4xl"
          >
            <ChevronLeftIcon className="w-full" />
          </button>
        )}

        {products?.map((p, i) => (
          <SliderProduct p={p} key={i} />
        ))}
        {activeChevron === "right" && (
          <button
            style={{boxShadow: "-3px 0px 6px 3px #ddd"}}
            onClick={() => clickHandler("+", "left")}
            className="z-20 absolute inset-y-0 my-auto right-0 w-12 h-28 flex items-center justify-center bg-white opacity-0 group-hover:opacity-100 font-serif font-bold text-4xl"
          >
            <ChevronRightIcon className="w-full text-black" />
          </button>
        )}
      </div>
    </div>
  );
}
