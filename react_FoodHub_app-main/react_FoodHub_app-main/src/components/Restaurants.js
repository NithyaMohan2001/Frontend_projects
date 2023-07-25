import styles from "../styles/body.module.css";
import { CDN_IMG_URL } from "../utils/Constants.js";
import { Link } from "react-router-dom";
const Restaurants = (param) => {
  const {
    id,
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    deliveryTime,
    costForTwo,
  } = param.restaurant;
  return (
    <Link
      to={`restaurant/${id}`}
      onClick={() => {
        window.scroll(0, 0);
      }}
    >
      <div className={styles.restaurant}>
        <div className={styles.restaurant_img}>
          <img
            src={`${CDN_IMG_URL}${cloudinaryImageId}`}
            alt="restaurant img"
          ></img>
        </div>
        <div className={styles.restaurant_name}>{name}</div>
        <div className={styles.restauranr_cuisine}>
          <span>{cuisines.join(",")}</span>
        </div>
        <div className={styles.restaurant_details}>
          <div className={styles.restaurant_rating}>
            <span>
              <img
                src="https://static-00.iconduck.com/assets.00/star-rating-icon-2048x2048-2k1x57ky.png"
                alt="start"
              />
            </span>
            <span>{avgRating}</span>
          </div>
          <div>•</div>
          <div>{deliveryTime + " MINS"}</div>
          <div>•</div>
          <div>₹{costForTwo / 100} FOR TWO</div>
        </div>
      </div>
    </Link>
  );
};

export default Restaurants;
