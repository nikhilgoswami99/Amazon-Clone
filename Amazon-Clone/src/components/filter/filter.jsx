import React, { useState, useContext } from "react";
import styles from "./filter.module.css";
import categoriesData from "../../categories";
import myContext from "../../context/data/myContext";

function Filter(props) {
  // getting data from context api
  const context = useContext(myContext);
  const { filters, setFilters, totalItems } = context;

  return (
    <>
      <div className={styles.filterBarContainer}>
        {/* Dropdown Filters */}
        <div className={styles.filterOptionsContainer}>
          <div className={styles.dropdownContainer}>
            <label htmlFor="categories" className={styles.label}>
              Categories
            </label>
            <select
              onChange={(e) => {
                props.category(e);
              }}
              id="categories"
              className={styles.dropdown}
            >
              {categoriesData.map((obj, idx) => {
                if (idx < categoriesData.length) {
                  return <option key={idx}>{obj.name}</option>;
                }
              })}
            </select>
          </div>

          <div className={styles.dropdownContainer}>
            <label htmlFor="country" className={styles.label}>
              Country
            </label>
            <select
              onChange={(e) => {
                props.country(e);
              }}
              id="country"
              className={styles.dropdown}
            >
              <option value="US">US</option>
              <option value="AU">AU</option>
              <option value="BR">BR</option>
              <option value="CA">CA</option>
              <option value="CN">CN</option>
              <option value="FR">FR</option>
              <option value="DE">DE</option>
              <option value="IN">IN</option>
              <option value="IT">IT</option>
              <option value="MX">MX</option>
              <option value="NL">NL</option>
              <option value="SG">SG</option>
              <option value="ES">ES</option>
              <option value="TR">TR</option>
              <option value="AE">AE</option>
              <option value="GB">GB</option>
              <option value="JP">JP</option>
              <option value="SA">SA</option>
              <option value="PL">PL</option>
              <option value="SE">SE</option>
              <option value="BE">BE</option>
              <option value="EG">EG</option>
            </select>
          </div>

          <div className={styles.dropdownContainer}>
            <label htmlFor="sorting" className={styles.label}>
              Sort By
            </label>
            <select
              onChange={(e) => {
                props.sortBy(e);
              }}
              id="sorting"
              className={styles.dropdown}
            >
              <option value="RELEVANCE">RELEVANCE</option>
              <option value="LOWEST_PRICE">LOWEST_PRICE</option>
              <option value="HIGHEST_PRICE">HIGHEST_PRICE</option>
              <option value="REVIEWS">REVIEWS</option>
              <option value="NEWEST">NEWEST</option>
              <option value="BEST_SELLERS">BEST_SELLERS</option>
            </select>
          </div>

          <div className={styles.dropdownContainer}>
            <label htmlFor="condition" className={styles.label}>
              Product Condition
            </label>
            <select onChange={(e) => {
              props.condition(e)
            }} id="condition" className={styles.dropdown}>
              <option value="all">ALL</option>
              <option value="new">NEW</option>
              <option value="used">USED</option>
              <option value="renewed">RENEWED</option>
              <option value="collectible">COLLECTIBLE</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
