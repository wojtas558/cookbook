import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router';

function App() {
  const url = "https://www.themealdb.com/api/json/v1/1/"
  const [meals, setMeals] = useState();
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("Beef")
  
  
  function changeCategory(){
    //meals
    fetch(url + "filter.php?c=" + category)
    .then(async resp => await resp.json())
    .then(resp => {
     setMeals(resp.meals);
    })
  }


  useEffect(() => {
    //categories
    fetch(url + "categories.php")
    .then(resp => resp.json())
    .then(resp => {
      setCategories(resp.categories);
    })
    
    changeCategory();
  }, [category]);
  
  
  if(meals instanceof Array){
    console.log(meals);
  }
  else{
    console.log("ahah");
    
  }
  
  return (
    <div className='container-fluid'>
      <div className='row text-center justify-content-center gy-2'>
        {categories ? categories.map((cat) => <div className='col-2 mx-2 border rounded' onClick={() => {
          setCategory(cat.strCategory);
          
          changeCategory();
        }}>
          <img src={cat.strCategoryThumb} className='img-fluid rounded'/>
          <b>{cat.strCategory}</b>
        </div>) : "ładowanie"}
      </div>
      <hr className='mt-4'/>
      <div className='row text-center'>
        <h1 className='md-4'>{category}</h1>
        {meals ? meals.map((meal) => <Link to={"meal/" + meal.idMeal} key={meal.idMeal} className='col-4'>
          <img className='rounded' src={meal.strMealThumb + "/small"} alt={meal.strMeal} />
          <p>{meal.strMeal}</p>
        </Link>) : "ładownaie"}
      </div>
    </div>
  );
}

export default App;
