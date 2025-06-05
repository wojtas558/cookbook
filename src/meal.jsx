import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Meal(){
  let params = useParams();
  const [meal, setMeal] = useState();
  
  useEffect(() => {
    //meal details
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + params.mealId)
    .then(resp => resp.json())
    .then((resp) => {
      setMeal(resp.meals[0]);
    });
  }, []);
  
  if(meal){


    return <div className="container-fluid p-2">
      <div className="d-flex flex-row">
        <img className="img-fluid rounded" src={meal.strMealThumb + "/medium"} alt={meal.strMeal} />
        <div className="m-4">
          <h1 className="">{meal.strMeal}</h1>
          <div>{meal.strCategory}, {meal.strArea}</div>
        </div>
      </div>
      <div>
        {meal.strInstructions}
      </div>
    </div> 
  }
}