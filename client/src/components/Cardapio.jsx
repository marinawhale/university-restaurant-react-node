import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cardapio.css';

const Cardapio = () => {
  const diaRefs = useRef({});
  const [cardapio, setCardapio] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowButton(true);
      else setShowButton(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/cardapio')
      .then((res) => res.json())
      .then((data) => {
        setCardapio(agruparPorDia(data));
      })
      .catch((err) => console.error('Erro ao carregar cardápio:', err));
  }, []);

  const navigate = useNavigate();
  const paginaInicial = () => navigate('/');

  const agruparPorDia = (data) => {
    const dias = {};
    let diaAtual = null;

    data.forEach((item) => {
      const match = item.data.match(/^(\d{2})/);
      if (match) diaAtual = match[1];
      if (!dias[diaAtual]) dias[diaAtual] = [];
      dias[diaAtual].push(item);
    });

    return dias;
  };

  const irParaDia = (dia) => {
    setSelectedDay(dia);

    if (diaRefs.current[dia]) {
      diaRefs.current[dia].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="cardapio-container">
      <div className='voltar-btn'>
        <p onClick={paginaInicial}>VOLTAR</p>
      </div>

      <div className="dias-container">
        <div className="dias-botoes">
          {Object.keys(cardapio).map((dia) => (
            <button
              key={dia}
              className={`dia-btn ${selectedDay === dia ? 'active' : ''}`}
              onClick={() => irParaDia(dia)}
            >
              {dia}
            </button>
          ))}
        </div>
      </div>

      {Object.entries(cardapio).map(([dia, refeicoes]) => (
        <div
          key={dia}
          className="dia"
          ref={(el) => (diaRefs.current[dia] = el)}
        >
          <h2>Dia {dia}</h2>
          <div className='dia-div'>
            {refeicoes.map((item, index) => (
              <div key={index} className="refeicao">
                <h3>{item.data.includes('ALMOÇO') ? 'ALMOÇO' : 'JANTAR'}</h3>
                <p><strong>Prato principal:</strong> {item.prato_principal}</p>
                <p><strong>Vegetariano:</strong> {item.vegetariano}</p>
                <p><strong>Guarnição:</strong> {item.guarnicao}</p>
                <p><strong>Arroz:</strong> {item.arroz}</p>
                <p><strong>Feijão:</strong> {item.feijao}</p>
                <p><strong>Salada 1:</strong> {item.salada_1}</p>
                <p><strong>Salada 2:</strong> {item.salada_2}</p>
                <p><strong>Suco:</strong> {item.suco}</p>
                <p><strong>Sobremesa:</strong> {item.sobremesa}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {showButton && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Cardapio;
