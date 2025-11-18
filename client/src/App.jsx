import { Routes, Route } from 'react-router-dom';
import React from 'react'

import Cardapiodia from './components/Cardapio-dia'
import Cardapio from './components/Cardapio'
import Menu from './components/Menu';

function App() {
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