import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { Collapse } from "bootstrap/dist/js/bootstrap.bundle";

export default function Navbar(){
  const url = "https://www.themealdb.com/api/json/v1/1/"
  
  const [categories, setCategories] = useState();
  const [countries, setCountries] = useState();
  const [filter, setFilter] = useState("filter.php?c=Beef");
  
  useEffect(() => {
  //categories
    fetch(url + "categories.php")
    .then(resp => resp.json())
    .then(resp => {
      setCategories(resp.categories);
    })
    //count
    fetch(url + "list.php?a=list")
    .then(resp => resp.json())
    .then(resp => {
      setCountries(resp.meals);
    })
  }, [filter]);


  return <>
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container">
        <Link className="navbar-brand me-5 d-flex align-items-center" to="/">
          <img className="me-3" src="/book.png" alt="logo" />
          <h1>Cookbook</h1>
        </Link>
        <button className="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target=".navbarPart">
          <span className="navbar-toggler-icon border-white"></span>
        </button>
        <div className="collapse navbar-collapse navbarPart">
          <div className="d-flex justify-content-center mb-3 mb-lg-0">
            <ul className="navbar-nav gap-3 justify-self-center">
              <li className="nav-item">
                <button className="btn bg-white dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#categories" onClick={() => {
                    new Collapse(document.getElementById("countries"), {
                        toggle: false
                      }).hide();
                  }}>
                  Categories
                </button>
              </li>
              <li className="nav-item">
                <button className="btn bg-white dropdown-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#countries" onClick={() => {
                    new Collapse(document.getElementById("categories"), {
                        toggle: false
                      }).hide();
                  }}>
                  Countries
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse navbar-collapse flex-grow-0 navbarPart">
          <form className="d-flex" id="search">
            <input className="form-control rounded-end-0" type="search" placeholder="Search"
            onEnded={() => {}}/>
            <button type="submit" className="btn btn-outline-success rounded-start-0">Search</button>
            </form>
        </div>
      </div>
    </nav>
    <div className="bg-dark border-bottom border-4">
      <div className="collapse pb-3" id="categories">
        <div className='row text-center justify-content-center gy-3 text-white'>
          {categories ? categories.map((cat) => <Link to="/" key={cat.idCategory} className={'col-3 col-lg-1 mx-3 p-1 border rounded'} onClick={() => {
            setFilter("filter.php?c=" + cat.strCategory);
            
            new Collapse(document.getElementById("categories"), {
              toggle: false
            }).hide();
          }}>
            <img src={cat.strCategoryThumb} className='img-fluid rounded'/>
            <b>{cat.strCategory}</b>
          </Link>) : "ładowanie"}
        </div>
      </div>
      <div className="collapse pb-3" id="countries">
        <div className='row text-center justify-content-center gy-3 text-white'>
          {countries ? countries.map((country) => <Link to="/" key={country.strArea} className={'col-3 col-lg-2 col-xl-1 mx-2 py-1 border rounded'} onClick={() => {
            setFilter("filter.php?a=" + country.strArea);
            
            new Collapse(document.getElementById("countries"), {
              toggle: false
            }).hide();
          }}>
            <b>{country.strArea}</b>
          </Link>) : "ładowanie"}
        </div>
      </div>
    </div>
    <Outlet context={filter}/>
  </>
}