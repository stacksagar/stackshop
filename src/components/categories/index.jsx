import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../redux/actions/category.action";
import CategoryBtn from "./CategoryBtn";
import SubCategory from "./SubCategory";
const Categories = () => {
  const dispatch = useDispatch();
  const {fetched, categories} = useSelector((state) => state.category);
  const [childrenCategories, setChildrenCategories] = useState([]);
  const [openSubCats, setOpenSubCats] = useState(false);

  useEffect(() => {
    if (!categories[0] && !fetched) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories, fetched]);

  return (
    <div
      onMouseEnter={() => setOpenSubCats(true)}
      onMouseLeave={() => setOpenSubCats(false)}
    >
      <div className="w-full h-header_sm bg-gray-100 text-black flex justify-around">
        {categories.map((c, i) => {
          return (
            <CategoryBtn
              key={i}
              text={c?.name}
              children={c.children}
              setChildrenCategories={setChildrenCategories}
            />
          );
        })}
      </div>

      {openSubCats && (
        <div className="bg-gray-100 text-gray-700 flex">
          {childrenCategories.map((c, i) => (
            <SubCategory setOpenSubCats={setOpenSubCats} key={i} category={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
