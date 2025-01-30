import axios from "axios";

const API_KEY = "AIzaSyAW0oQhxol9dX5xAaz00wvSp4259-Ipyzc"; // Replace with your actual API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (prompt) => {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.data.candidates[0].content.parts[0].text; // Correct extraction
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "Error fetching response.";
  }
};
