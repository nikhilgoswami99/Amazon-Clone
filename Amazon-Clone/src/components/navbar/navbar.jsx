import { useContext } from "react";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { auth } from "../../firebase/firebaseConfig"; // Firebase authentication instance
import { signOut } from "firebase/auth";

function Navbar() {
  const context = useContext(myContext);
  const { cartArr, setUserDetails, userDetails } = context;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUserDetails(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link to={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      {/* Location */}
      <div className={styles.locationContainer}>
        <span className={styles.locationText}>Deliver to Nikhil</span>
        <span className={styles.location}>Kanpur - 208007</span>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBarContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Amazon"
        />
        <button className={styles.searchButton}>🔍</button>
      </div>

      {/* User Info */}
      <div className={styles.userContainer}>
        {userDetails ? (
          <>
            <span className={styles.userText}>
              Hello, {userDetails.email || "User"}
            </span>
            <button className={styles.signOutButton} onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>
              <span className={styles.userText}>Sign In</span>
            </Link>
            <Link to="/sign-up" className={styles.signUpButton}>
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Cart */}
      <div className={styles.cartContainer}>
        <Link to="/cart" className={styles.navLink}>
          <span className={styles.cartIcon}>🛒</span>
          <span className={styles.cartCount}>{cartArr.length}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
