import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import styles from "./signUp.module.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/firebaseConfig";
import { setDoc, doc, Timestamp } from "firebase/firestore";

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp(e) {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user in Firestore with UID as document ID
      const userRef = doc(fireDB, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        time: Timestamp.now()
      });

      toast.success("Sign Up Successful!");
      navigate("/login");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Try logging in.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters.");
      } else {
        toast.error("Sign Up Failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.logoContainer}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.signUpBox}>
        <h1 className={styles.signUpTitle}>Create Account</h1>
        <form onSubmit={signUp}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className={styles.input}
              required
              minLength="6"
            />
          </div>
          <button type="submit" className={styles.signUpButton} disabled={loading}>
            {loading ? "Signing Up..." : "Continue"}
          </button>
        </form>
        <p className={styles.privacyNotice}>
          By continuing, you agree to Amazon's{" "}
          <a href="/" className={styles.link}>Conditions of Use</a>{" "}
          and{" "}
          <a href="/" className={styles.link}>Privacy Notice</a>.
        </p>
        <div className={styles.divider}></div>
        {/* <button className={styles.googleSignUpButton}>
          Sign up with Google
        </button> */}
        <p className={styles.haveAccount}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
