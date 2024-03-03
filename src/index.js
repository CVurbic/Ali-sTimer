import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css';
import Login from './components/Login';
import App from './App';




const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  }, {
    path: "/",
    element: <App />,
  },

]);
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <div className='fixed top-0 left-0 bg-[#e2d7ce] w-screen h-screen -z-50' />
    <RouterProvider router={router} />
  </React.StrictMode>
);

