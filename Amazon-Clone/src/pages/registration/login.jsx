import React, { useContext, useState } from "react";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, fireDB } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import myContext from "../../context/data/myContext";

function Login() {
  const context = useContext(myContext);
  const { setUserDetails, userDetails } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please enter both email and password.");
    }

    setLoading(true); // Start loading state

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve user data from Firestore
      const userDocRef = doc(fireDB, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User data from Firestore:", userDoc.data());
        setUserDetails(userDoc.data());
        localStorage.setItem("user", JSON.stringify(userDoc.data()));

        toast.success("Login successful!");
        navigate("/"); // Redirect to dashboard or homepage
      } else {
        toast.warn("No additional user data found in Firestore.");
      }
    } catch (error) {
      toast.error("Error signing in: " + error.message);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoContainer}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>Sign-In</h1>
        <form onSubmit={signIn}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {"Email :- nikhil@gmail.com"}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {"Password :- nikhil@1999"}
          </div>
          <button type="submit" className={styles.signInButton}>
            {loading ? "Signing in..." : "Continue"} {/* Show "Signing in..." when loading */}
          </button>
        </form>
        <p className={styles.privacyNotice}>
          By continuing, you agree to Amazon's <a href="/" className={styles.link}>Conditions of Use</a> and <a href="/" className={styles.link}>Privacy Notice</a>.
        </p>
        <div className={styles.divider}></div>
        <div className={styles.createAccountDiv}>
          Create your Amazon account - 
          <Link className={styles.linkToSignup} to="/sign-up"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
