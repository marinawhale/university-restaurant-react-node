import './Cardapio-dia.css'
import { useNavigate } from 'react-router-dom';

import restaurante from '../assets/restaurante4.jpg'

const Cardapio = () => {

    const navigate = useNavigate();

    const irParaCardapio = () => {
        navigate('/cardapio');
    }

    return (
        <div className="cardapio-div">
            <div className='imagem'>
                <p><img src={restaurante} alt="restaurante" /></p>
            </div>
            <div className='cardapio'>
                <h2 onClick={irParaCardapio}>CARDÁPIO DO DIA</h2>
                <h3>Refeições saudáveis e equilibradas!</h3>
            </div>
        </div>
    )
}

export default Cardapio