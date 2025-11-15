import './Menu.css'
import { Hamburger, Candy, CupSoda } from 'lucide-react'
import Lanches from './opcoes-cardapio/Lanches'
import Bebidas from './opcoes-cardapio/Bebidas'
import Doces from './opcoes-cardapio/Bomboniere'

import { useState } from 'react'

const Menu = () => {
    const [categoria, setCategoria] = useState('lanches')

    const botoes = [
        { nome: "lanches", icone: <Hamburger />},
        { nome: "bebidas", icone: <CupSoda />},
        { nome: "doces", icone: <Candy />}
    ]

    const renderConteudo = () => {
        switch (categoria) {
            case "lanches":
                return <Lanches />
            case "bebidas":
                return <Bebidas />
            case "doces":
                return <Doces />
            default:
                return <Lanches />
        }
    }

    return (
        <div className="menu">
            <div className='menu-header'>
                <div className='options'>
                    {botoes.map(({ nome, icone }) => (
                        <div
                            key={nome}
                            onClick={() => setCategoria(nome)}
                            className={`options-btn ${categoria === nome ? 'active' : ''}`}
                        >
                            <span className='options-icon'>{icone}</span>
                            <span className='options-nome'>{nome}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='items'>
                {renderConteudo()}
            </div>
        </div>
    )
}

export default Menu
