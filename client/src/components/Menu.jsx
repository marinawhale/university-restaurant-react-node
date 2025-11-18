import './Menu.css'
import React from 'react'
import { Hamburger, Candy, CupSoda } from 'lucide-react'
import Salgados from './opcoes-cardapio/Salgados'
import Bebidas from './opcoes-cardapio/Bebidas'
import Doces from './opcoes-cardapio/Bomboniere'

import { useState } from 'react'

const Menu = () => {
    const [categoria, setCategoria] = useState('Salgados')

    const botoes = [
        { nome: "Salgados", icone: <Hamburger />},
        { nome: "Bebidas", icone: <CupSoda />},
        { nome: "Doces", icone: <Candy />}
    ]

    const renderConteudo = () => {
        switch (categoria) {
            case "Salgados":
                return <Salgados />
            case "Bebidas":
                return <Bebidas />
            case "Doces":
                return <Doces />
            default:
                return <Salgados />
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
