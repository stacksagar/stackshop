import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Buttons = ({active, setActive}) => (
  <>
    <button
      onClick={() => setActive((p) => p - 1)}
      disabled={active === 0}
      className="bg-white shadow w-12 h-28  rounded-r absolute inset-y-0 left-0 my-auto flex items-center justify-center"
    >
      <ChevronLeftIcon className="w-9 text-black" />
    </button>

    <button
      onClick={() => setActive((p) => p + 1)}
      disabled={active === 3}
      className="bg-white shadow w-12 h-28 rounded-l absolute inset-y-0 my-auto right-0 flex items-center justify-center"
    >
      <ChevronRightIcon className="w-9 text-black" />
    </button>
  </>
);
const Slider = () => {
  const sliders = [
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/storage-of-stacksagar.appspot.com/o/samsung.jpg?alt=media&token=82763c14-a2c2-4fce-b15d-f1d2a83b9e33",
      link: "/products/61c6ab01683fc8839ddff536",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/storage-of-stacksagar.appspot.com/o/jeckets.jpg?alt=media&token=c3455759-ddd3-4504-bd3e-090a5cda8144",
      link: "/products/61dcf91d90ef9f5221390813",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/storage-of-stacksagar.appspot.com/o/books.jpg?alt=media&token=eff496e0-fa94-4bb7-ae8d-d7369625e5f8",
      link: "/products/61dcf99790ef9f522139087c",
    },
    {
      image:
        "https://firebasestorage.googleapis.com/v0/b/storage-of-stacksagar.appspot.com/o/sarees.jpg?alt=media&token=3a324e93-db73-4f28-8adf-b1a0d3c65061",
      link: "/products/61dfb47707023db2060724f8",
    },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setActive((p) => {
        if (p === 3) {
          return 0;
        } else {
          return p + 1;
        }
      });
    }, 10000);
  }, []);
  return (
    <div className="relative w-full h-minus_header_sm_dbl">
      {sliders.map(
        (s, i) =>
          active === i && (
            <div key={i} className={`w-full h-full text-2xl transition`}>
              <Link to={s.link}>
                <img
                  className="w-full h-full object-cover"
                  src={s.image}
                  alt=""
                />
              </Link>
            </div>
          )
      )}

      <Buttons setActive={setActive} active={active} />
    </div>
  );
};

export default Slider;
