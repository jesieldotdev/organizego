import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AppProvider } from './context/AppContext';
import { SnackbarProvider } from 'notistack';
import Store from "./store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Store>
        <SnackbarProvider>

          <AppProvider>
            <App />
          </AppProvider>
        </SnackbarProvider>

      </Store>
    </BrowserRouter>
  </React.StrictMode>
);
