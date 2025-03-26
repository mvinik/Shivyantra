import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "antd/es/typography/Link";
const categories = [
  { 
    name: "Electronics", 
    subcategories: ["Mobiles", "Laptops", "Cameras"] 
  },
  { 
    name: "Fashion", 
    subcategories: ["Men", "Women", "Kids"] 
  },
  { 
    name: "Home & Furniture", 
    subcategories: ["Sofas", "Beds", "Dining"] 
  }
];

const CategorySidebar = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="mb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className="flex items-center justify-between w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              {category.name}
              {openCategory === category.name ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {openCategory === category.name && (
              <ul className="ml-4 mt-2">
                {category.subcategories.map((sub) => (
                  <li key={sub} className="p-1 text-gray-700 hover:text-black cursor-pointer">
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div>
      <div>
        <h2 className="text-xl font-bold mb-4">Price Range</h2>
         
        </div>
       <div>
       <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>

          {Array.isArray(categories) ? (
           categories?.map((category, index) => (
              <Link
                key={index}
                className='relative transition-all duration-200 px-4 py-2 text-black'

                to={`/shop?category=${encodeURIComponent(category?.attributes?.CategoryName)}`}
              >
                <div className='flex flex-col justify-center items-center gap-2 '>
                  {/* <span className="block px-4 py-2  w-full text-sm text-black
                                     hover:bg-red translate-x-1 transition-all duration-300 hover:text-white"

                  >{category?.attributes?.CategoryName}</span> */}
                  <button
                    onClick={() => toggleCategory(category?.attributes?.CategoryName)}
                    className="flex items-center justify-between w-full text-left p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    {category?.attributes?.CategoryName}
                    {openCategory === category?.attributes?.CategoryName ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {/* {openCategory === category?.attributes?.CategoryName && (
                    <ul className="ml-4 mt-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub} className="p-1 text-gray-700 hover:text-black cursor-pointer">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )} */}
                </div>
              </Link>
            ))
          ) : (
            <p>No categories available</p>
          )}
        </ul>
       </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
