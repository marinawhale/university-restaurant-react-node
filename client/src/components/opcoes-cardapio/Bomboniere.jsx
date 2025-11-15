import Hamburger from '../../assets/hamburger.jpg'

const opcoes = [
    { nome: "Chocolate", img: Hamburger},
    { nome: "Bala", img: Hamburger},
    { nome: "Paçoca", img: Hamburger},
    { nome: "Chiclete", img: Hamburger}
]

const Doces = () => {
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

export default Doces