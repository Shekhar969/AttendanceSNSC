import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './Components/routing';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} future={{ v7_startTransition: true }} />
  </StrictMode>
);

