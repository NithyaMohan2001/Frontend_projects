import styles from "../styles/footer.module.css";
import logo from "../assets/images/Logo.jpg";
import iosAppStore from "../assets/images/app-store.png";
import googlePlayStore from "../assets/images/google-play-store.png";
import facebook from "../assets/images/facebook.png";
import insta from "../assets/images/insta.png";
import linkdIn from "../assets/images/linkedin.png";
import twitter from "../assets/images/twitter.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer_detail}>
        <div>
          <p className={styles.title_name}>COMPANY</p>
          <ul className={styles.footer_list}>
            <li>
              <Link
                data-testid="test_aboutus"
                to="/about"
                /*target="_blank"*/ onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                About us
              </Link>
            </li>
            <li>
              <Link to="#">Team</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={styles.title_name}>CONTACT</p>
          <ul className={styles.footer_list}>
            <li>
              <Link
                data-testid="test_contact"
                to="/contact"
                onClick={() => {
                  window.scroll(0, 0);
                }}
              >
                Help & Support
              </Link>
            </li>
            <li>
              <Link to="#">Partner with us</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={styles.title_name}>LEGAL</p>
          <ul className={styles.footer_list}>
            <li>
              <Link to="#">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="#">Refund & Cancellation</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className={styles.app_store}>
          <a href="https://www.apple.com/app-store/" target={"_blank"}>
            <img
              className={styles.app_store_img}
              src={iosAppStore}
              alt="ios app store"
            />
          </a>
          <a
            href="https://play.google.com/store/games?device=windows"
            target={"_blank"}
          >
            <img
              className={styles.app_store_img}
              src={googlePlayStore}
              alt="google play store"
            />
          </a>
        </div>
      </div>
      <div className={`${styles.footer_detail} ${styles.item_align}`}>
        <div className={styles.logo}>
          <Link
            data-testid="test_logo"
            to="/"
            onClick={() => {
              window.scroll(0, 0);
            }}
          >
            <img alt="food hub" src={logo} />
          </Link>
        </div>
        <div style={{ fontSize: "20px" }}>© 2023 Food Hub</div>
        <div className={styles.social_media}>
          <ul>
            <li>
              <a href="https://www.facebook.com/" target={"_blank"}>
                <img className={styles.icon} src={facebook} alt="facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target={"_blank"}>
                <img className={styles.icon} src={insta} alt="insta" />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/" target={"_blank"}>
                <img className={styles.icon} src={linkdIn} alt="linkedIn" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target={"_blank"}>
                <img className={styles.icon} src={twitter} alt="twitter" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.site_dev}>
        This site is developed by <span>DIVYA</span>
      </div>
    </div>
  );
};
export default Footer;
