import './Header.css'
import logo from '../assets/logo.png'
import { ShoppingCart, UserCircle, Home } from 'lucide-react'

const Header = () => {

  const irParaCardapio = () => {
    window.location.href = 'https://www.ufsj.edu.br'
  }

    return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={irParaCardapio}>
          <img src={logo} alt="Logo UFSJ" />
          <p>UNIVERSIDADE FEDERAL DE SÃO JOÃO DEL-REI</p>
        </div>

        <nav className="header-options">
          <p><Home /></p>
          <p><ShoppingCart /></p>
          <p><UserCircle /></p>
        </nav>
      </div>
    </header>
  )
}

export default Header