import { use, useEffect, useState } from 'react';
import './App.css';
import { Link, useOutletContext } from 'react-router';



function App(props) {
  const url = "https://www.themealdb.com/api/json/v1/1/"
  const [meals, setMeals] = useState();
  const category = useOutletContext();
  
  useEffect(() => {
    fetch(url + "filter.php?c=" + category)
    .then(async resp => await resp.json())
    .then(resp => {
      setMeals(resp.meals);
    });

    console.log("aaa");
    
  }, [category]);


  return (
    <div className='container-fluid'>
      <div className='row text-center '>
        <h1 className='p-1'>{category}</h1>
        {meals ? meals.map((meal) => <Link to={"meal/" + meal.idMeal} key={meal.idMeal} className='col-3'>
          <img className='rounded' src={meal.strMealThumb + "/small"} alt={meal.strMeal} />
          <p>{meal.strMeal}</p>
        </Link>) : "ładownaie"}
      </div>
    </div>
  );
}

export default App;
