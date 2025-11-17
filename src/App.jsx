import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Menu from './components/Menu'
import Cardapiodia from './components/Cardapio-dia'
import Cardapio from './components/Cardapio'

import './App.css'

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
  )
}

export default App
