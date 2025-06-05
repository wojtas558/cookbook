import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import Meal from './meal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/meal/:mealId' element={<Meal />} />
        </Routes>
        
    </BrowserRouter>
);
