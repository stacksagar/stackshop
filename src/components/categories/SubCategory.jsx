import {Link} from "react-router-dom";
const SubCategory = ({className, category, setOpenSubCats}) => {
  return (
    <div className={`p-5 border w-full ${className}`}>
      <p className="text-black font-semibold mb-1">{category.name}</p>
      <div className="flex flex-col space-y-1">
        {category.children.map((c, i) => (
          <Link
            to={`/products/${c._id}`}
            key={i}
            onClick={() => setOpenSubCats(false)}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategory;
