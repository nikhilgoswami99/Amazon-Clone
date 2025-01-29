import React, { useState } from "react";
import styles from "./hero.module.css";

import img1 from "../../assets/hero_images/img(1).jpg";
import img2 from "../../assets/hero_images/img(2).jpg";
import img3 from "../../assets/hero_images/img(3).jpg";
import img4 from "../../assets/hero_images/img(4).jpg";
import img5 from "../../assets/hero_images/img(5).jpg";
import img6 from "../../assets/hero_images/img(6).jpg";

function Hero() {
    const images = [img1, img2, img3, img4, img5, img6];
  const [idx, setIdx] = useState(0);

  function rightShift()
  {
    if(idx < images.length - 1)
    {
        setIdx((prev) => {
            return prev + 1;
        })
    }
  }

  function leftShift()
  {
    if(idx > 0)
        {
            setIdx((prev) => {
                return prev - 1;
            })
        }
  }

  return (
    <>
      <div className={styles.heroContainer}>
        <img src={images[idx]} alt="Hero" className={styles.heroImage} />

        {/* Left Button */}
        <button className={styles.leftButton} onClick={leftShift}>
          &#9664;
        </button>

        {/* Right Button */}
        <button className={styles.rightButton} onClick={rightShift}>
          &#9654;
        </button>
      </div>
    </>
  );
}

export default Hero;
