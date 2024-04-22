import React from 'react';
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import router from './navigation/router';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
