import { useEffect, useState } from "react";
import { ALL_RESTAURANT_URL } from "../utils/Constants.js";

const useRestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filterRestaurantList, setFilterRestaurantList] = useState([]);

  const getRestaurantsList = async () => {
    const response = await fetch(ALL_RESTAURANT_URL);
    const liveData = await response.json();
    if (liveData?.statusCode == 0) {
      setRestaurantList(liveData?.data?.cards[2]?.data?.data?.cards);
      setFilterRestaurantList(liveData?.data?.cards[2]?.data?.data?.cards);
    } else {
      throw console.error("data not found");
    }
  };
  useEffect(() => {
    getRestaurantsList();
  }, []);

  /* const getALLRestaurantList = () => {
    return restaurantList;
  };
 */
  return [
    restaurantList,
    setRestaurantList,
    filterRestaurantList,
    setFilterRestaurantList,
  ];
};

export default useRestaurantList;
