import styles from "../styles/body.module.css";
import Restaurants from "./Restaurants.js";

const RestaurantsList = (param) => {
  const { restaurantList } = param;
  return (
    <div data-testid="test_restaurant_list" className={styles.restaurants_list}>
      {restaurantList?.map((restaurant) => (
        <Restaurants
          key={`restaurant-${restaurant?.data?.id}`}
          restaurant={restaurant?.data}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;
