import styles from './footer.module.css'
import {Link} from 'react-router-dom'

function Footer()
{
    return <>
    <footer className={styles.footer}>
      {/* Back to Top Button */}
      <div className={styles.backToTop}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to Top
        </button>
      </div>

      {/* Main Footer Content */}
      <div className={styles.footerContent}>
        {/* Social Icons */}
        <div className={styles.socialIcons}>
          <a href="#" className={styles.icon}>FB</a>
          <a href="#" className={styles.icon}>TW</a>
          <a href="#" className={styles.icon}>IG</a>
          <a href="#" className={styles.icon}>LN</a>
        </div>

        {/* Logo */}
        <div className={styles.logoContainer}>
          <img
            src="/logo.png" // Replace with your logo path
            alt="Amazon Logo"
            className={styles.logo}
          />
        </div>

        {/* Links Section */}
        <div className={styles.linksContainer}>
          <a href="/conditions" className={styles.link}>Conditions of Use & Sale</a>
          <a href="/privacy" className={styles.link}>Privacy Notice</a>
          <a href="/ads" className={styles.link}>Interest-Based Ads</a>
        </div>

        {/* Orders and Cart */}
        <div className={styles.ordersCartContainer}>
          <Link to="/order" className={styles.link}>Orders</Link>
          <Link to="/cart" className={styles.link}>Cart</Link>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          © 1996-2025, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </footer>
    </>
}

export default Footer;