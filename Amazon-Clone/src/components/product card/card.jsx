import React, { useContext } from 'react'
import styles from './card.module.css'
import myContext from '../../context/data/myContext';

function Card(props) {

  const context = useContext(myContext);

  const {addToCart} = context;
  
  
  return (
    <>
      <div className={styles.productCard}>
      {/* Product Image */}
      <img
        src={props.product_photo
        } // Replace with product image
        alt="Product"
        className={styles.productImage}
      />

      {/* Product Title */}
      <h2 className={styles.productTitle}>{props.product_title}</h2>

      {/* Product Price */}
      <p className={styles.productPrice}>{props.product_price
      }</p>

      {/* Add to Cart Button */}
      <button onClick={() => {addToCart(props)}} className={styles.addToCartButton}>Add to Cart</button>
    </div>
    </>
  )
}

export default Card;
