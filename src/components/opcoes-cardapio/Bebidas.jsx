import AguaMineral from '../../assets/bebidas/agua-mineral.jpg'
import AguaSaborizada from '../../assets/bebidas/agua-saborizada.jpg'
import AguaComGas from '../../assets/bebidas/agua-com-gas.jpg'
import Cafe from '../../assets/bebidas/cafe.jpg'
import CafeComLeite from '../../assets/bebidas/cafe-com-leite.jpg'
import LeiteCOmAchocolatado from '../../assets/bebidas/leite-com-achocolatado.jpg'
import Leite from '../../assets/bebidas/leite.jpg'
import Chocomil from '../../assets/bebidas/chocomil.jpg'
import SucoLata from '../../assets/bebidas/suco-lata.jpg'
import Refrigerante200 from '../../assets/bebidas/refrigerante-200.jpg'
import Refrigerante220 from '../../assets/bebidas/refrigerante-220.jpg'
import Refrigerante350 from '../../assets/bebidas/refrigerante-350.jpg'
import Refrigerante600 from '../../assets/bebidas/refrigerante-600.jpg'
import Refrigerante2 from '../../assets/bebidas/refrigerante-2.jpg'
import SucoCaixa from '../../assets/bebidas/suco-caixa.jpg'
import SucoNatural from '../../assets/bebidas/suco-natural.jpg'
import Energetico from '../../assets/bebidas/energetico.jpg'

const formatarParaReal = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

const Bebidas = () => {

    const bebidasOpcoes = [
    {
        "nome": "Água Mineral",
        "preco": 3.00,
        "img": AguaMineral
    },
    {
        "nome": "Água Saborizada",
        "preco": 4.00,
        "img": AguaSaborizada
    },
    {
        "nome": "Água com Gás",
        "preco": 3.00,
        "img": AguaComGas
    },
    {
        "nome": "Café",
        "preco": 3.00,
        "img": Cafe
    },
    {
        "nome": "Café com Leite P",
        "preco": 4.00,
        "img": CafeComLeite
    },
    {
        "nome": "Café com Leite G",
        "preco": 5.00,
        "img": CafeComLeite
    },
    {
        "nome": "Leite com Achocolatado P",
        "preco": 4.00,
        "img": LeiteCOmAchocolatado
    },
    {
        "nome": "Leite com Achocolatado G",
        "preco": 5.00,
        "img": LeiteCOmAchocolatado
    },
    {
        "nome": "Leite 200ml",
        "preco": 3.00,
        "img": Leite
    },
    {
        "nome": "Chocomil",
        "preco": 4.00,
        "img": Chocomil
    },
    {
        "nome": "Suco Lata",
        "preco": 5.00,
        "img": SucoLata
    },
    {
        "nome": "Refrigerante 200ml",
        "preco": 8.00,
        "img": Refrigerante200
    },
    {
        "nome": "Refrigerante 220ml",
        "preco": 4.00,
        "img": Refrigerante220
    },
    {
        "nome": "Refrigerante 350ml",
        "preco": 5.00,
        "img": Refrigerante350
    },
    {
        "nome": "Refrigerante 600ml",
        "preco": 7.00,
        "img": Refrigerante600
    },
    {
        "nome": "Refrigerante 2L",
        "preco": 9.00,
        "img": Refrigerante2
    },
    {
        "nome": "Suco Caixa",
        "preco": 4.00,
        "img": SucoCaixa
    },
    {
        "nome": "Suco Natural",
        "preco": 5.00,
        "img": SucoNatural
    },
    {
        "nome": "Energético",
        "preco": 14.00,
        "img": Energetico
    }
]

    return (
        <>
            {bebidasOpcoes.map(({ nome, img, preco }) => (
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

export default Bebidas