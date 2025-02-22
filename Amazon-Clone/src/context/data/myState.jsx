import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import axios from "axios";


function MyState(props) {
  // for data transfer to all components
  let [data, setData] = useState([]);
  let [loader, setLoader] = useState(false);
  let [userDetails, setUserDetails] = useState(null);
  let [input, setInput] = useState("");


  const [cartArr, setCartArr] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartArr));
  }, [cartArr]);

  function addToCart(product)
  {
    setCartArr((prev) => {
      // Check if the product is already in the cart
      const existingProduct = prev.find((item) => item.asin === product.asin);
      if (existingProduct) {
        // Update quantity if already in cart
        return prev.map((item) =>
          item.asin === product.asin ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new product to cart with quantity = 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }


  // initial params values
  let [filters, setFilters] = useState({
    query: "All Departments",
    page: "1",
    country: "US",
    sort_by: "RELEVANCE",
    product_condition: "ALL",
    is_prime: "false",
    deals_and_discounts: "NONE",
  });


  //b7d05f204amsh7df98a9dd610c75p1671f1jsn006f3eee3537, 41ef75cbcamsh58da2adee279124p18cba7jsn021699ab6e69
  // data fetching logic
  async function AllProductsData() {
    const options = {
      method: "GET",
      url: "https://real-time-amazon-data.p.rapidapi.com/search",
      params: filters,
      headers: {
        "x-rapidapi-key": "b7d05f204amsh7df98a9dd610c75p1671f1jsn006f3eee3537",
        "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    try {
      setLoader(true);
      const response = await axios.request(options);
      setData(response.data.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  }

  // calling the data fetching funcion whenever filters change
  useEffect(() => {
    AllProductsData();
  }, [filters]);

  return (
    <>
      <MyContext.Provider value={{ data, filters, setFilters, addToCart, cartArr, setCartArr, loader, userDetails, setUserDetails, setInput, input }}>
        {props.children}
      </MyContext.Provider>
    </>
  );
}

export default MyState;
