import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";

export default function Navbar(){
  const url = "https://www.themealdb.com/api/json/v1/1/"
  
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("Beef");

  
  
  useEffect(() => {
    //categories
    fetch(url + "categories.php")
    .then(resp => resp.json())
    .then(resp => {
      setCategories(resp.categories);

              // changeCategory();

    })
    
  }, [category]);
  

  return <>
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container">
        <Link className="navbar-brand me-5" to="/">
          <h1>LOGO</h1>
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#categories">
                Categories
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary dropdown-toggle" type="button">
                Categories2
              </button>
            </li>
          </ul>
        </div>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
      <div className="bg-dark border-bottom border-4">
        <div className="collapse pb-3" id="categories">
          <div className='row text-center justify-content-center gy-3'>
            {categories ? categories.map((cat) => <Link to="/" className='col-2 mx-3 p-1 border rounded' key={cat.idCategory} onClick={() => {
              setCategory(cat.strCategory);
            }}>
              <img src={cat.strCategoryThumb} className='img-fluid rounded'/>
              <b>{cat.strCategory}</b>
            </Link>) : "ładowanie"}
          </div>
        </div>
      </div>
    <Outlet context={category}/>
  </>
}