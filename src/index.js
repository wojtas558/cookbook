import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './index.css';
import Meal from './meal';
import Navbar from './navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route element={<Navbar />}>
            <Route index element={<App />} />
            <Route path='/meal/:mealId' element={<Meal />} />
        </Route>
    </Routes>
  </BrowserRouter>
);
