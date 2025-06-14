import { useEffect, useState } from 'react';
import './App.css';
import { Link, useOutletContext } from 'react-router';


function App(props) {
  const url = "https://www.themealdb.com/api/json/v1/1/"
  const [meals, setMeals] = useState();
  const filter = useOutletContext();
  
  useEffect(() => {
    fetch(url + filter)
    .then(async resp => await resp.json())
    .then(resp => {      
      if(resp.meals != "no data found")
        setMeals(resp.meals);
      else
        setMeals([""]);
    });
    
  }, [filter]);

  return (
    <div className='container-fluid'>
      <div className='row text-center justify-content-center gy-1'>
        <h1 className='py-4'>{filter.substring(filter.indexOf("?") + 3, filter.length)}</h1>
        {meals ? meals.map((meal) => <Link to={"meal/" + meal.idMeal} key={meal.idMeal} className='col-6 col-md-4 col-lg-3 col-xl-2'>
          <img className='rounded' src={meal.strMealThumb + "/small"} alt={meal.strMeal} />
          <p>{meal.strMeal}</p>
        </Link>) : "ładownaie"}
      </div>
    </div>
  );
}

export default App;
