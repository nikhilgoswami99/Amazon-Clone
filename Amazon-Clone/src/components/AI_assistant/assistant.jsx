import { useState, useContext } from "react";
import myContext from "../../context/data/myContext";
import { getGeminiResponse } from "../../geminiAPI";
import styles from "./assistant.module.css";

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const context = useContext(myContext);

  const { cartArr, setCartArr } = context;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setChat([...chat, userMessage]);
    setInput("");

    const aiResponse = await getGeminiResponse(input);
    const aiMessage = { type: "ai", text: aiResponse };

    setChat([...chat, userMessage, aiMessage]);
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
