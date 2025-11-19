import { Routes, Route } from 'react-router-dom';
import React from 'react'

import Cardapiodia from './components/Cardapio-dia'
import Cardapio from './components/Cardapio'
import Menu from './components/Menu';
import usePageTracking from '../usePageTracking';

import ReactGA from 'react-ga4';
const TRACKING_ID = "G-M6M659BB9L";
ReactGA.initialize(TRACKING_ID);

function App() {
  usePageTracking();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <>
            <Cardapiodia />
            <Menu />
          </>
        } 
      />
      <Route path="/cardapio" element={<Cardapio />} />
    </Routes>
  );
}

export default App;