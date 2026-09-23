import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

// eslint-disable-next-line no-unused-vars
const FoodDisplay = ({ category }) => {
  const { food_list, searchTerm } = useContext(StoreContext);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you! </h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          const matchesCategory =
            category === "All" || category === item.category;
          const matchesSearch = item.name
            .toLowerCase()
            .includes(normalizedSearchTerm);

          if (matchesCategory && matchesSearch) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
