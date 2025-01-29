import styles from "./cart.module.css";
import myContext from "../../context/data/myContext";
import { useContext, useState } from "react";


function CartPage() {
  const context = useContext(myContext);

  const { cartArr, setCartArr} = context;

  // deleting a particular Item
  function deleteProduct(props)
  {
    setCartArr((prev) => {
      return prev.filter((obj) => {
        if(obj.asin !== props.asin)
        {
          return obj;
        }
      })
    })
  }


  // increasing the quantity
  function increaseQuantity(props)
  {
    setCartArr((prev) =>
      prev.map((obj) =>
        obj.asin === props.asin ? { ...obj, quantity: obj.quantity + 1 } : obj
      )
    );
    
  }

  // decreasing the quantity
  function decreaseQuantity(props)
  {

    setCartArr((prev) =>
      prev.map((obj) =>
        obj.asin === props.asin ? { ...obj, quantity: obj.quantity - 1 } : obj
      ).filter((obj) => {
        return obj.quantity > 0
      })
    );
    
  }
  

  

  return (
    <>
      <h1 className={styles.heading}>Your Amazon Cart</h1>
      <div className={styles.cart}>
        {cartArr.map((obj, idx) => {
          return <Cart key={idx} {...obj} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} deleteProduct={deleteProduct}></Cart>;
        })}
      </div>
    </>
  );
}

// created cart component separately
function Cart(props) {

  


  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.cartItem}>
          <img
            src={props.product_photo}
            alt="product_photo"
            className={styles.productImage}
          />
          <div className={styles.productDetails}>
            <h2 className={styles.productTitle}>{props.product_title}</h2>
            <p className={styles.productPrice}>Price: {props.product_price}</p>
            <p className={styles.productOriginalPrice}>
              Original Price:{" "}
              <span className={styles.strikethrough}>
                {props.product_original_price}
              </span>
            </p>
            <p className={styles.productRating}>
              Rating: {props.product_star_rating}
            </p>
            <p className={styles.productDelivery}>Delivery: {props.delivery}</p>
            <p className={styles.productSales}>{props.sales_volume}</p>
            <div className={styles.productActions}>
              <button onClick={() => {props.decreaseQuantity(props)}} className={styles.quantityBtn} id="decrease-btn">
                -
              </button>
              <span id={styles.quantity}>{props.quantity}</span>
              <button onClick={() => {props.increaseQuantity(props)}} className={styles.quantityBtn} id="increase-btn">
                +
              </button>
              <button onClick={() => {props.deleteProduct(props)}} className={styles.deleteBtn}>Delete from Cart</button>
            </div>
            <div className={styles.totalPrice}>
              <p>
                Total: $<span id="total-price">{props.product_price * props.quantity}</span>
              </p>
            </div>
            <button className={styles.buyBtn}>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;