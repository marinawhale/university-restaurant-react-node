import React from 'react'
import './Header.css'
import logo from '../assets/logo.png'
import { ShoppingCart, UserCircle, Home } from 'lucide-react'

const Header = () => {

  const irParaUFSJ = () => {
    window.open('https://www.ufsj.edu.br', '_blank')
  }

  const irParaCAP = () => {
    window.open('https://www.ufsj.edu.br/cap', '_blank')
  }

    return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={irParaUFSJ}>
          <img src={logo} alt="Logo UFSJ" />
          <p>
            <span className="logo-texto-completo">UNIVERSIDADE FEDERAL DE SÃO JOÃO DEL-REI</span>
            <span className="logo-sigla">UFSJ</span>
          </p>
        </div>
        <div className='header-cap'>
          <div
          className="logo-cap"
          onClick={irParaCAP}
          ><b>CAP</b> - Campus Alto Paraopeba</div>
        </div>

        {/*<nav className="header-options">
          <p><Home /></p>
          <p><ShoppingCart /></p>
          <p><UserCircle /></p>
        </nav>*/}
      </div>
    </header>
  )
}

export default Header