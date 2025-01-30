import styles from "./cart.module.css";
import myContext from "../../context/data/myContext";
import { useContext, useState } from "react";

import AIAssistant from "../../components/AI_assistant/assistant";

function CartPage() {
  const context = useContext(myContext);
  const { cartArr, setCartArr } = context;

  const totalCartPrice = cartArr
    .reduce((total, product) => {
      const productPrice = parseFloat(product.product_price.replace("$", ""));
      const productTotalPrice = productPrice * product.quantity;
      return total + productTotalPrice;
    }, 0)
    .toFixed(2);

  // State for controlling AI assistant visibility
  const [showAI, setShowAI] = useState(false);

  // Toggle the visibility of AI assistant
  const toggleAI = () => {
    setShowAI((prev) => !prev);
  };

  // Deleting a particular item
  function deleteProduct(props) {
    setCartArr((prev) => prev.filter((obj) => obj.asin !== props.asin));
  }

  // Increasing the quantity
  function increaseQuantity(props) {
    setCartArr((prev) =>
      prev.map((obj) =>
        obj.asin === props.asin ? { ...obj, quantity: obj.quantity + 1 } : obj
      )
    );
  }

  // Decreasing the quantity
  function decreaseQuantity(props) {
    setCartArr((prev) =>
      prev
        .map((obj) =>
          obj.asin === props.asin ? { ...obj, quantity: obj.quantity - 1 } : obj
        )
        .filter((obj) => obj.quantity > 0)
    );
  }

  return (
    <>
      {/* AI button to toggle visibility */}
      <button
        className={styles.aiButton}
        onClick={toggleAI}
      >
        AI
      </button>

      {/* AI Assistant Section, visible only when showAI is true */}
      {showAI && (
        <div className={styles.assistant}>
          <AIAssistant />
        </div>
      )}

      <h1 className={styles.heading}>Your AI Powered Cart</h1>
      <h1 className={styles.totalCartPrice}>
        Total Price :- <span style={{ color: "red" }}>{totalCartPrice}</span>
      </h1>

      <div className={styles.cart}>
        {cartArr.map((obj, idx) => (
          <Cart
            key={idx}
            {...obj}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
    </>
  );
}

function Cart(props) {
  const price = parseFloat(props.product_price.replace("$", ""));
  const totalPrice = (price * props.quantity).toFixed(2);

  return (
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
            <span className={styles.strikethrough}>{props.product_original_price}</span>
          </p>
          <p className={styles.productRating}>Rating: {props.product_star_rating}</p>
          <p className={styles.productDelivery}>Delivery: {props.delivery}</p>
          <p className={styles.productSales}>{props.sales_volume}</p>
          <div className={styles.productActions}>
            <button
              onClick={() => props.decreaseQuantity(props)}
              className={styles.quantityBtn}
            >
              -
            </button>
            <span>{props.quantity}</span>
            <button
              onClick={() => props.increaseQuantity(props)}
              className={styles.quantityBtn}
            >
              +
            </button>
            <button
              onClick={() => props.deleteProduct(props)}
              className={styles.deleteBtn}
            >
              Delete from Cart
            </button>
          </div>
          <div className={styles.totalPrice}>
            <p>Total: ${totalPrice}</p>
          </div>
          <button className={styles.buyBtn}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
