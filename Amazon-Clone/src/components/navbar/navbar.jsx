import { useContext, useEffect } from "react";
import styles from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { auth } from "../../firebase/firebaseConfig"; // Firebase authentication instance
import { signOut } from "firebase/auth";

function Navbar() {
  const context = useContext(myContext);
  const { cartArr, setUserDetails, userDetails, searchInput, setInput, input } = context;
  const navigate = useNavigate();

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, [setUserDetails]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUserDetails(null);
      // navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link className={styles.navLink} to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className={styles.logo}
          />
          
        </Link>
        {/* <span className={styles.home}>Home</span> */}
      </div>

      {/* Location */}
      <div className={styles.locationContainer}>
        <span className={styles.locationText}>Deliver to Nikhil</span>
        <span className={styles.location}>Kanpur - 208007</span>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBarContainer}>
        <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
          type="text"
          id="text"
          className={styles.searchInput}
          placeholder="Search Amazon"
        />
        <button onClick={searchInput} className={styles.searchButton}>🔍</button>
      </div>

      {/* User Info */}
      <div className={styles.userContainer}>
        {userDetails ? (
          <>
            <span className={styles.userText}>Hello, {userDetails.email}</span>
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
          <span className={styles.cartIcon}>🛒 <span className={styles.cartText}>Cart</span></span>
        </Link>
        <span className={styles.cartCount}>{cartArr.length}</span>
      </div>
    </nav>
  );
}

export default Navbar;
