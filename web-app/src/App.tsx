import React from 'react';
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import router from './navigation/router';
import { Provider } from 'react-redux';
import { store } from './api/store/store';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" bodyClassName={`text-sm`} />
    </Provider>
  );
}

export default App;
