import Hamburger from '../../assets/hamburger.jpg'

const opcoes = [
    { nome: "Refrigerante", img: Hamburger},
    { nome: "Suco", img: Hamburger},
    { nome: "Água", img: Hamburger},
    { nome: "Energético", img: Hamburger}
]

const Bebidas = () => {
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

export default Bebidas