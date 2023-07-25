import { useEffect, useState } from "react";
import { RESTAURANT_MANU_URL } from "../utils/Constants.js";

const useRestaurantDetail = (id) => {
  const [restaurantMenu, setRestaurantMenu] = useState([]);
  const [restaurantMenuOuter, setRestaurantMenuOuter] = useState([]);

  const getRestaurantsMenu = async () => {
    const response = await fetch(RESTAURANT_MANU_URL + id);
    const menuData = await response.json();
    console.log(menuData?.data);
    if (menuData.statusCode == 0) {
      setRestaurantMenu(
        menuData?.data?.cards[menuData?.data?.cards?.length - 1]?.groupedCard
          ?.cardGroupMap?.REGULAR?.cards
      );
      setRestaurantMenuOuter(menuData?.data?.cards[0]?.card?.card?.info);
    } else {
      throw console.error("data not found");
    }
  };
  useEffect(() => {
    getRestaurantsMenu();
  }, []);

  return [restaurantMenu, restaurantMenuOuter];
};

export default useRestaurantDetail;
