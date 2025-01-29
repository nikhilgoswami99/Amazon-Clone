import styles from './home.module.css'
import myContext from '../../context/data/myContext';
import Filter from "../../components/filter/filter";
import { useContext } from 'react';

import products from '../../products'

import Hero from '../../components/hero section/hero';
import Card from '../../components/product card/card';

function Home() {
  // getting data from context api
  const context = useContext(myContext);
  const { data, filters, setFilters } = context;


  // fetching data on search
  function searchInput()
  {
    
  }



  // fetching data category wise
  function changeCategory(e) {
    let category = e.target.value;
    setFilters((prev) => {
      return { ...prev, query: `${category}` };
    });
  }

  // fetching data country wise
  function changeCountry(e) {
    let country = e.target.value;
    setFilters((prev) => {
      return {...prev, country: `${country}`}
    })
  }

  // sorting data
  function sortProducts(e) {
    let sortQuery = e.target.value;
    console.log(sortQuery);
    
    setFilters((prev) => {
      return {...prev, sort_by: `${sortQuery}`}
    })
    }

    // fethcing data condition wise 
    function productCondition(e)
    {
      let condition = e.target.value;
      console.log(condition);
      
      setFilters((prev) => {
        return {...prev, product_condition: `${condition.toUpperCase()}`}
      })
    }
  

  return (
    <>
    <section className={styles.homeContainer}>
      <Hero></Hero>
      <Filter category={changeCategory} country={changeCountry} sortBy={sortProducts} condition={productCondition}></Filter>
      <div className={styles.cardContainer}>
        {data.map((obj, idx) => {
          return <Card key={obj.asin} {...obj}></Card>;
        })}
      </div>
      
    </section>
    </>
  )
}

export default Home;