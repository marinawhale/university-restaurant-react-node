import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'

// const reponame = '/university-restaurant-react-node/';
// const basename = import.meta.env.DEV ? '/' : reponame;

const basename = '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
