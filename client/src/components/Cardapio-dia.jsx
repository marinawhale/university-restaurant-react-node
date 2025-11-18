import './Cardapio-dia.css'
import { useNavigate } from 'react-router-dom';
import React from 'react'

import restaurante from '../assets/faixada-ufsj.jpg'

const Cardapio = () => {
    
    const navigate = useNavigate();

    const irParaCardapio = () => {
        navigate('/cardapio');
    }

    return (
        <div className="cardapio-dia">
            <img src={restaurante} alt="restaurante" />
            <h2 onClick={irParaCardapio}>VER CARDAPIO COMPLETO</h2>
        </div>
    )
}

export default Cardapio