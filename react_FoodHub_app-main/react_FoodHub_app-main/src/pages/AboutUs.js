import aboutUsImg from "../assets/images/about_us.jpg";
import foodImg from "../assets/images/food_img.jpg";
import styles from "../styles/about.module.css";
const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.top_item}>
        <img src={foodImg} alt="food-img"></img>
        <h1 className={styles.top_text}>Better food for more people</h1>
      </div>
      <div className={styles.bottom_item}>
        <div>
          <h1 style={{ color: "black" }}>
            Improving <span style={{ color: "red" }}>quality</span> of food
          </h1>
          <p>
            We are committed to nurturing a neutral platform and are helping
            food establishments maintain high standards through Hyperpure. Food
            Hygiene Ratings is a coveted mark of quality among our restaurant
            partners.
          </p>
        </div>
        <div className={styles.last_text}>
          <div>
            <h1 style={{ color: "black" }}>
              <span style={{ color: "red" }}>Who</span> are we ?
            </h1>
            <p>
              We build innovative products & solutions that deliver unparalleled
              convenience to urban consumers. The best part? Every bit of your
              work at Food hub will help elevate the lives of our users across
              India.
            </p>
            <p>
              Our technology platform connects customers, restaurant partners
              and delivery partners, serving their multiple needs. Customers use
              our platform to search and discover restaurants, read and write
              customer generated reviews and view and upload photos, order food
              delivery, book a table and make payments while dining-out at
              restaurants. On the other hand, we provide restaurant partners
              with industry-specific marketing tools which enable them to engage
              and acquire customers to grow their business while also providing
              a reliable and efficient last mile delivery service. We also
              operate a one-stop procurement solution, Hyperpure, which supplies
              high quality ingredients and kitchen products to restaurant
              partners. We also provide our delivery partners with transparent
              and flexible earning opportunities.
            </p>
          </div>
          <div className={styles.aboutImg}>
            <img
              src={aboutUsImg}
              alt="about-us-img"
              className="rounded-xl"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
