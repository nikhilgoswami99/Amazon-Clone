import styles from "./footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        {/* Back to Top Button */}
        <div className={styles.backToTop}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </button>
        </div>

        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <img className={styles.footerlogo} src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' alt="" />
          </div>

          {/* Orders and Cart */}
          <div className={styles.ordersCartContainer}>
            <Link to="/cart" className={styles.link}>
              <span className={styles.gotocart}>Go To Cart</span>
            </Link>
          </div>

          {/* Copyright Section */}
          <div className={styles.copyright}>
            <div className={styles.linksContainer}>
              <a href="/conditions" className={styles.link}>
                Conditions of Use & Sale
              </a>
              <a href="/privacy" className={styles.link}>
                Privacy Notice
              </a>
              <a href="/ads" className={styles.link}>
                Interest-Based Ads
              </a>
            </div>
            <span>
              <span style={{ color: "orange" }}>©</span> 1996-2025, Amazon.com,
              Inc. or its affiliates
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
