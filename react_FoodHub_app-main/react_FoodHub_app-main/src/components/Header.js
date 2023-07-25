import styles from "../styles/header.module.css";
import logo from "../assets/images/Logo.jpg";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/userContext";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = useAuth();
  const cartItemsCount = useSelector((store) => store.cart.totalCount);
  return (
    <div className={styles.header_main}>
      <div className={styles.logo}>
        <Link
          to="/"
          onClick={() => {
            window.scroll(0, 0);
          }}
        >
          <img data-testid="test_logo" alt="food hub" src={logo} />
        </Link>
      </div>
      <div className={styles.page_list}>
        <ul>
          <li>
            <Link
              to="/about"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              data-testid="test_cartPage"
              to="/cart"
              onClick={() => {
                window.scroll(0, 0);
              }}
            >
              <span data-testid="test_cart" className={styles.cart_item_count}>
                {cartItemsCount}
              </span>
              <span>Cart</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.signInOut}>
        <span data-testid="test_auth">{auth?.user?.name}</span>
        {auth.user ? (
          <button
            className="submit_btnContainer submit_Btn"
            style={{ fontWeight: "bold" }}
            onClick={auth.logout}
          >
            Log Out
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <button
              data-testid="test_loginBtn"
              className="submit_btnContainer submit_Btn"
              style={{ fontWeight: "bold" }}
            >
              Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
