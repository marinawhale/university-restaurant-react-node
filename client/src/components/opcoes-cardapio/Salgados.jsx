import SalgadoAssado from '../../assets/salgados/salgado-assado.jpg'
import SalgadoFrito from '../../assets/salgados/salgado-frito.png'
import MiniPizza from '../../assets/salgados/mini-pizza.jpg'
import HamburgerAssado from '../../assets/salgados/hamburger-assado.jpg'
import Tortinha from '../../assets/salgados/tortinha.jpg'
import PaoComManteiga from '../../assets/salgados/pao-com-manteiga.png'
import PaoComOvo from '../../assets/salgados/pao-com-ovo.jpg'
import PaoComQueijo from '../../assets/salgados/pao-com-queijo.jpg'
import PaoComOvoEQueijo from '../../assets/salgados/pao-com-ovo-e-queijo.jpg'
import PaoDeQUeijo from '../../assets/salgados/pao-de-queijo.jpg'
import Gulao from '../../assets/salgados/gulao.jpg'

const formatarParaReal = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

const Salgados = () => {

    const opcoesSalgados = [
        {
            "nome": "Salgado Assado",
            "preco": 7.00,
            "img": SalgadoAssado
        },
        {
            "nome": "Salgado Frito",
            "preco": 8.00,
            "img": SalgadoFrito
        },
        {
            "nome": "Mini Pizza",
            "preco": 8.00,
            "img": MiniPizza
        },
        {
            "nome": "Hambúrger Assado",
            "preco": 9.00,
            "img": HamburgerAssado
        },
        {
            "nome": "Tortinha",
            "preco": 3.00,
            "img": Tortinha
        },
        {
            "nome": "Pão com Manteiga",
            "preco": 4.00,
            "img": PaoComManteiga
        },
        {
            "nome": "Pão com Ovo",
            "preco": 6.00,
            "img": PaoComOvo
        },
        {
            "nome": "Pão com Queijo",
            "preco": 6.00,
            "img": PaoComQueijo
        },
        {
            "nome": "Pão com Ovo e Queijo",
            "preco": 8.00,
            "img": PaoComOvoEQueijo
        },
        {
            "nome": "Pão de Queijo",
            "preco": 3.00,
            "img": PaoDeQUeijo
        },
        {
            "nome": "Gulão",
            "preco": 8.00,
            "img": Gulao
        }
    ];

    return (
        <>
            {opcoesSalgados.map(({ nome, img, preco }) => (
                <div className='items-div'>
                    <div key={nome}>
                        <img src={img} alt={nome} />
                        <p>{nome}</p>
                        <p>{formatarParaReal(preco)}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Salgados