import {useEffect, useState} from "react";
import axiosInstance from "../../helpers/axiosInstance";
import ProductsSlider from "../utilities/ProductsSlider";
import Slider from "./Slider";

const Home = () => {
  const [allP, setAllP] = useState({});
  useEffect(() => {
    axiosInstance
      .get("/api/product/products")
      .then((res) => res.data.products)
      .then(setAllP);
  }, []);
  return (
    <div>
      <Slider />
      <div className="bg-gray-200 p-10 flex flex-col space-y-10">
        {Object.keys(allP).map((key) => (
          <ProductsSlider title={key} key={key} products={allP[key]} />
        ))}
      </div>
    </div>
  );
};

export default Home;
