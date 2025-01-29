import React from 'react'
import styles from './loader.module.css'

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.amazonLogo}>a</div>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loader
