import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";

export default function SearchRestaurant() {
  const { restaurants } = useContext(RestaurantContext);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (!searchQuery.trim()) {
      setResult([]);
      return;
    }

    const found = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResult(found.length > 0 ? found : "No matching restaurant found");
  };

  return (
    <div className="max-w-md mx-auto mt-0 p-4 bg-[#7A1523] rounded-2xl shadow-md">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search for a restaurant"
          value={query}
          onChange={handleSearch}
          className="flex-grow border border-gray-300 bg-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFE662]"
        />
      </div>

      <div className="mt-4 space-y-4">
        {Array.isArray(result) ? (
          result.map((restaurant) => (
            <Link
              key={restaurant._id}
              to={`/restaurant/${restaurant._id}`}
              state={{ restaurant }}
              className="block p-4 rounded-lg hover:bg-[#212121] hover:text-white transition-all duration-300"
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                <p className="mt-2 text-gray-700 group-hover:text-gray-300">
                  {restaurant.description}
                </p>
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="mt-4 w-full h-40 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h3 className="font-semibold">Menu:</h3>
                  <ul className="list-disc list-inside">
                    {restaurant.menu.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-lg text-[#800020]">{result}</p>
        )}
      </div>
    </div>
  );
}
