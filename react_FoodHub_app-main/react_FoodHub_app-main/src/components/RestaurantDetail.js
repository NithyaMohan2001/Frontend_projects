import { useParams } from "react-router-dom";
import styles from "../styles/restaurantDetail.module.css";
import { CDN_IMG_URL } from "../utils/Constants.js";
import Shimmer from "./Shimmer";
import useRestaurantDetail from "../hooks/useRestaurantDetail";
import { addItem, addRestaurant, removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import PopupCart from "./PopupCart";
import { useState } from "react";

const RestaurantDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItem = useSelector((store) => store.cart);

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [savedItem, setSavedItem] = useState(null);

  const [restaurantMenu, restaurantMenuOuter] = useRestaurantDetail(id);

  const restaurant = {
    id: restaurantMenuOuter?.id,
    name: restaurantMenuOuter?.name,
    img: restaurantMenuOuter?.cloudinaryImageId,
  };

  const HandleAddItemInCart = (item) => {
    if (cartItem?.restaurant?.id === "") {
      dispatch(addRestaurant(restaurant));
      dispatch(addItem(item));
    } else if (cartItem?.restaurant?.id === restaurantMenuOuter?.id) {
      dispatch(addItem(item));
    } else if (cartItem?.restaurant?.id !== restaurantMenuOuter?.id) {
      console.log("want to add new restaurant in cart ");
      setIsPopUpVisible(true);
      setSavedItem(item);
    }
  };

  const HandleRemoveItemInCart = (item) => {
    dispatch(removeItem(item));
  };

  const HandleCheckItemInCart = (item) => {
    const findItem = cartItem?.items?.find(
      (indexItem) => indexItem.id === item?.id
    );
    if (findItem) {
      return (
        <div className={`${styles.add_button} test_menu_btn`}>
          <span onClick={() => HandleRemoveItemInCart(item)}>-</span>
          <span>{findItem?.count}</span>
          <span onClick={() => HandleAddItemInCart(item)}>+</span>
        </div>
      );
    } else {
      return (
        <div
          className={`${styles.add_button} test_menu_btn`}
          onClick={() => HandleAddItemInCart(item)}
        >
          ADD
        </div>
      );
    }
  };

  return restaurantMenu?.length === 0 || restaurantMenuOuter?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className={styles.rest_container}>
      {
        <PopupCart
          isPopUpVisible={isPopUpVisible}
          setIsPopUpVisible={setIsPopUpVisible}
          restaurant={restaurant}
          savedItem={savedItem}
        />
      }
      <div className={styles.restaurant_box}>
        <div
          data-testid="test_rest_outerMenu"
          className={styles.restaurant_name_rate}
        >
          <div className={styles.restaurant_name}>
            <p className={styles.rest_name}>{restaurantMenuOuter?.name}</p>
            <p>{restaurantMenuOuter?.cuisines?.join(",")}</p>
            <p>
              {restaurantMenuOuter?.areaName} , {restaurantMenuOuter?.city}
            </p>
            <p>{restaurantMenuOuter?.feeDetails?.message}</p>
          </div>
          <div className={styles.restaurant_rate}>
            <div className={styles.star_div}>
              <span>
                <img
                  src="https://static-00.iconduck.com/assets.00/star-rating-icon-2048x2048-2k1x57ky.png"
                  alt="start"
                />
              </span>
              <span>{restaurantMenuOuter?.avgRating}</span>
            </div>
            <div>{restaurantMenuOuter?.totalRatingsString}</div>
          </div>
        </div>
        <div className={styles.restaurant_delTime}>
          <ul>
            <li>{restaurantMenuOuter?.sla?.deliveryTime} MINS</li>
            <li>₹{restaurantMenuOuter?.costForTwo / 100} FOR TWO</li>
          </ul>
        </div>
        <div data-testid="test_rest_Menu" className={styles.menu_container}>
          {
            /*total*/
            restaurantMenu?.map((allItems) => {
              return (
                <div key={Math.random()} className={styles.total_menu}>
                  {allItems?.card?.card?.itemCards?.map((eachMenuItem) => {
                    let item = eachMenuItem?.card?.info;
                    return (
                      <div key={item?.id} className={styles.menu_box}>
                        <div className={styles.menu_detail}>
                          <p>{item?.name}</p>
                          <p>
                            ₹{item?.price / 100 || item?.defaultPrice / 100}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "gray",
                              marginTop: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            {item?.description}
                          </p>
                        </div>
                        <div className={styles.menu_img}>
                          {item?.imageId && (
                            <img
                              src={`${CDN_IMG_URL}${item?.imageId}`}
                              alt="img"
                            />
                          )}
                          <div className={styles.add_button_container}>
                            {HandleCheckItemInCart(item)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
