import Hamburger from '../../assets/hamburger.jpg'

const opcoes = [
    { nome: "Hambúrger", img: Hamburger},
    { nome: "Misto", img: Hamburger},
    { nome: "Pão de queijo", img: Hamburger},
    { nome: "Mini Pizza", img: Hamburger}
]

const Lanches = () => {
    return (
        <>
            {opcoes.map(({ nome, img }) => (
                <div className='items-div'>
                    <div key={nome}>
                        <img src={img} alt={nome} />
                        <p>{nome}</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Lanches