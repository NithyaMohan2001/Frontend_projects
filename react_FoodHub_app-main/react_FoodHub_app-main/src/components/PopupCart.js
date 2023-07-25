import { useDispatch } from "react-redux";
import styles from "../styles/restaurantDetail.module.css";
import { addItem, addRestaurant, clearCart } from "../utils/cartSlice";

const PopupCart = ({
  isPopUpVisible,
  setIsPopUpVisible,
  restaurant,
  savedItem,
}) => {
  const dispatch = useDispatch();
  if (!isPopUpVisible) return null;

  /* if (isPopUpVisible) {
    //const modal = document.querySelector(`.${styles.modal_Container}`);
    //modal.style.display = "block";
  } */
  const HandleNoButton = () => {
    setIsPopUpVisible(false);
  };

  const HandleYesButton = () => {
    setIsPopUpVisible(false);
    //clear cart
    console.log("first clear cart and add new restaurant item in cart .");
    dispatch(clearCart());
    // add new restaurant in cart
    setTimeout(() => {
            dispatch(addRestaurant(restaurant));
            dispatch(addItem(savedItem));
    }, 1000);
  };

  return (
    <div
      style={{ display: isPopUpVisible ? "block" : "none" }}
      className={styles.modal_Container}
    >
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={HandleNoButton}>
          &times;{" "}
        </span>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "10px",
          }}
        >
          Items already in cart
        </p>
        <p style={{ fontSize: "15px" }}>
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className={styles.popup_btContainer}>
          <button
            className={`${styles.pop_btnNO} ${styles.pop_btn}`}
            onClick={HandleNoButton}
          >
            NO
          </button>
          <button
            className={`${styles.pop_btnYes} ${styles.pop_btn}`}
            onClick={HandleYesButton}
          >
            YES,START AFRESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCart;
