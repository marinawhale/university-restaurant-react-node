import Bolo from '../../assets/doces/bolo.jpg'
import Batom from '../../assets/doces/batom.jpg'
import BisXtra from '../../assets/doces/bis-xtra.jpg'
import Bombom from '../../assets/doces/bombom.jpg'
import Caribe from '../../assets/doces/caribe.png'
import Charge from '../../assets/doces/charge.jpg'
import Chokito from '../../assets/doces/chokito.jpg'
import DiamanteNegro from '../../assets/doces/diamante-negro.jpg'
import FiveStar from '../../assets/doces/5star.jpg'
import KitKat from '../../assets/doces/kitkat.jpg'
import Laka from '../../assets/doces/laka.jpg'
import Prestigio from '../../assets/doces/prestigio.jpg'
import Suflair from '../../assets/doces/suflair.jpg'
import Snickers from '../../assets/doces/snickers.png'
import Trento from '../../assets/doces/trento.jpg'
import BalaSortida from '../../assets/doces/bala-sortida.jpg'
import BalaBolete from '../../assets/doces/bala-bolete.jpg'
import BalaToffee from '../../assets/doces/bala-toffee.jpg'
import BalaDeGoma from '../../assets/doces/bala-de-goma.jpg'
import Halls from '../../assets/doces/halls.jpg'
import Trident from '../../assets/doces/trident.jpg'
import Mentos from '../../assets/doces/mentos.png'
import PastilhaGaroto from '../../assets/doces/pastilha-garoto.jpg'
import Pirulito from '../../assets/doces/pirulito.jpg'
import Fruittella from '../../assets/doces/fruittella.jpg'
import Pacoca from '../../assets/doces/pacoca.jpg'
import DoceBarra from '../../assets/doces/doce-barra.jpg'
import PipocaDoce from '../../assets/doces/pipoca-doce.jpg'

const formatarParaReal = (valor) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
};

const Doces = () => {

    const docesOpcoes = [
    {
        "nome": "Bolo Gelado",
        "preco": 6.00,
        "img": Bolo
    },
    {
        "nome": "Bolo Pedaço",
        "preco": 5.00,
        "img": Bolo
    },
    {
        "nome": "Batom",
        "preco": 2.50,
        "img": Batom
    },
    {
        "nome": "Bis Xtra",
        "preco": 6.00,
        "img": BisXtra
    },
    {
        "nome": "Bombom",
        "preco": 2.50,
        "img": Bombom
    },
    {
        "nome": "Caribe",
        "preco": 5.00,
        "img": Caribe
    },
    {
        "nome": "Charge",
        "preco": 5.00,
        "img": Charge
    },
    {
        "nome": "Chokito",
        "preco": 5.00,
        "img": Chokito
    },
    {
        "nome": "Diamante Negro",
        "preco": 6.00,
        "img": DiamanteNegro
    },
    {
        "nome": "Five Star",
        "preco": 6.00,
        "img": FiveStar
    },
    {
        "nome": "Kit Kat",
        "preco": 7.00,
        "img": KitKat
    },
    {
        "nome": "Laka",
        "preco": 6.00,
        "img": Laka
    },
    {
        "nome": "Prestígio",
        "preco": 5.00,
        "img": Prestigio
    },
    {
        "nome": "Suflair",
        "preco": 9.00,
        "img": Suflair
    },
    {
        "nome": "Snickers",
        "preco": 6.00,
        "img": Snickers
    },
    {
        "nome": "Trento",
        "preco": 6.00,
        "img": Trento
    },
    {
        "nome": "Bala Sortida",
        "preco": 0.20,
        "img": BalaSortida
    },
    {
        "nome": "Bala Bolete",
        "preco": 0.25,
        "img": BalaBolete
    },
    {
        "nome": "Bala Toffee",
        "preco": 0.30,
        "img": BalaToffee
    },
    {
        "nome": "Bala de Goma",
        "preco": 3.00,
        "img": BalaDeGoma
    },
    {
        "nome": "Halls",
        "preco": 4.00,
        "img": Halls
    },
    {
        "nome": "Trident",
        "preco": 4.00,
        "img": Trident
    },
    {
        "nome": "Mentos",
        "preco": 4.00,
        "img": Mentos
    },
    {
        "nome": "Pastilha Garoto",
        "preco": 2.00,
        "img": PastilhaGaroto
    },
    {
        "nome": "Pirulito",
        "preco": 2.00,
        "img": Pirulito
    },
    {
        "nome": "Fruittella",
        "preco": 5.00,
        "img": Fruittella
    },
    {
        "nome": "Paçoca",
        "preco": 2.00,
        "img": Pacoca
    },
    {
        "nome": "Doce Barra",
        "preco": 4.00,
        "img": DoceBarra
    },
    {
        "nome": "Pipoca",
        "preco": 6.00,
        "img": PipocaDoce
    }
]
    return (
        <>
            {docesOpcoes.map(({ nome, img, preco }) => (
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

export default Doces