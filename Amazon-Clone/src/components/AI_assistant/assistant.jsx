import { useState, useContext } from "react";
import myContext from "../../context/data/myContext";
import { getGeminiResponse } from "../../geminiAPI";
import styles from "./assistant.module.css";

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false); // State to track AI response loading

  const context = useContext(myContext);
  const { cartArr } = context;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setChat([...chat, userMessage]);
    setInput("");
    setLoading(true); // Start loading

    // Check if the input matches any product title in the cart
    const product = cartArr.find((product) =>
      product.product_title.toLowerCase().includes(input.toLowerCase())
    );

    if (product) {
      // If a match is found, ask AI for the product's description
      const aiResponse = await getGeminiResponse(`Tell me about the product: ${product.product_title}`);
      const aiMessage = { type: "ai", text: aiResponse };
      setChat([...chat, userMessage, { type: "ai", text: "Wait... I am getting the information for you!" }, aiMessage]);
    } else {
      // If no match is found, respond with a "not found" message
      const aiResponse = "Sorry, I couldn't find any product with that title in your cart. Please try again.";
      const aiMessage = { type: "ai", text: aiResponse };
      setChat([...chat, userMessage, aiMessage]);
    }

    setLoading(false); // Stop loading once the response is received
  };

  return (
    <div className={styles.amazonAiContainer}>
      <h2 className={styles.assistantHeader}>Your AI Shopping Assistant</h2>
      <div className={styles.chatBox}>
        {chat.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[message.type]}`}
          >
            {message.text}
          </div>
        ))}
        {loading && (
          <div className={styles.message}>Wait... I am getting the information for you!</div>
        )}
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Ask about your cart..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default AIAssistant;
