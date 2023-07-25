import styles from "../styles/shimmer.module.css";

const Shimmer = () => {
  return (
    <div data-testid="test_shimmer" className={styles.shimmer}>
      {Array.apply(null, Array(20)).map((index) => {
        return (
          <div key={Math.random()} className={styles.shimmer_box}>
            <div className={styles.shimmer_img}></div>
            <div className={styles.shimmer_detail}></div>
            <div className={styles.shimmer_detail}></div>
          </div>
        );
      })}
    </div>
  );
};

export default Shimmer;
