import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css';


import Login from './components/Login.jsx';
import App from './App';
import EmployeeTimerSetter from './components/EmployeeTimerSetter';

import bgAli from "./assets/aliBg.avif"





const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/",
    element: <App />,
  }, {
    path: "/setTime",
    element: <EmployeeTimerSetter />,
  },

]);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm -z-50"
      style={{ backgroundImage: `url(${bgAli})` }}
    ></div>
    <RouterProvider router={router} />
  </React.StrictMode>
);

