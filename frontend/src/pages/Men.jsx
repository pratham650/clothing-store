import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { X, SlidersHorizontal } from "lucide-react";
import menProducts from "../data/menProducts";

const Men = () => {
  const { searchTerm } = useSearch();

  const [filters, setFilters] = useState({
    styles: [],
    colors: [],
  });

  const [visibleCount, setVisibleCount] = useState(20);
  const [showFilters, setShowFilters] = useState(false); // For mobile dropdown

  const styleOptions = ["Hoodies", "Sweatshirt", "Oversized", "Regular", "Plain T-Shirts"];
  const colorOptions = ["Black", "White", "Maroon", "Yellow", "Navy Blue", "Red", "Bottle Green"];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const shuffleArray = (array) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const filteredProducts = useMemo(() => {
    const result = menProducts.filter((product) => {
      const styleMatch =
        filters.styles.length === 0 || filters.styles.includes(product.style);
      const colorMatch =
        filters.colors.length === 0 || filters.colors.includes(product.color);
      const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return styleMatch && colorMatch && searchMatch;
    });
    return shuffleArray(result);
  }, [filters, searchTerm]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-10">
      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* Filter Toggle Button */}
        {!showFilters && (
          <button
            onClick={() => setShowFilters(true)}
            className="fixed left-4 top-24 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
            aria-label="Open Filters"
          >
            <SlidersHorizontal size={20} />
          </button>
        )}

        {/* Sidebar Filter - Collapsible Overlay */}
        {showFilters && (
          <>
            {/* Backdrop for mobile */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setShowFilters(false)}
            />
            
            {/* Filter Panel */}
            <aside className="fixed md:sticky left-0 top-0 h-screen md:h-fit md:top-4 w-80 md:w-64 bg-white shadow-2xl md:shadow-md p-5 border border-blue-100 z-50 md:z-auto overflow-y-auto animate-slideIn">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close Filters"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Style Filter */}
              <div className="mb-5">
                <h4 className="text-gray-700 font-medium mb-3 text-sm">Style</h4>
                <div className="space-y-2">
                  {styleOptions.map((style) => (
                    <label key={style} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={filters.styles.includes(style)}
                        onChange={() => handleFilterChange("styles", style)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-gray-600 text-sm">{style}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <h4 className="text-gray-700 font-medium mb-3 text-sm">Color</h4>
                <div className="space-y-2">
                  {colorOptions.map((color) => (
                    <label key={color} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color)}
                        onChange={() => handleFilterChange("colors", color)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <span className="text-gray-600 text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              {(filters.styles.length > 0 || filters.colors.length > 0) && (
                <button
                  onClick={() => setFilters({ styles: [], colors: [] })}
                  className="w-full mt-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </aside>
          </>
        )}

        {/* Product Section */}
        <main className={`w-full transition-all duration-300 ${
          showFilters ? 'md:w-[calc(100%-16rem)]' : 'md:w-full'
        }`}>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 tracking-tight text-left">
            👕 Men's Collection
          </h2>
        
          {filteredProducts.length > 0 ? (
            <>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-300 ${
                showFilters ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
              }`}>
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300 block"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[300px] object-cover"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <p className="text-blue-600 font-bold mt-1">₹ {product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleSeeMore}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center mt-16">
              <p className="text-gray-600 text-lg">😕 No matching products found. <br /> We will Add This Soon </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Men;
