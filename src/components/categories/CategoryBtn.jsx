import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/solid";
import {useEffect, useState} from "react";

const CategoryBtn = ({text, children, setChildrenCategories}) => {
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (isHover) {
      setChildrenCategories(children);
    }
  }, [children, isHover, setChildrenCategories]);

  return (
    <button
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className="flex space-x-1 items-center text-sm"
    >
      <span>{text}</span>
      {isHover ? (
        <ChevronUpIcon className="w-4" />
      ) : (
        <ChevronDownIcon className="w-4 text-gray-400" />
      )}
    </button>
  );
};

export default CategoryBtn;
