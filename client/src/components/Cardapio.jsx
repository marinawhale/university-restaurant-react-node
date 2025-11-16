import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cardapio.css';

const MES_BASE = 10;
const ANO_BASE = 2025;

const diasDaSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const getPlaceholderCount = (year, monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1).getDay(); 
    return (firstDay) % 7;
};

const gerarTodosOsDiasDoMes = () => {
  const ultimoDia = new Date(ANO_BASE, MES_BASE + 1, 0).getDate();
  const dias = [];
  for (let i = 1; i <= ultimoDia; i++) {
    const diaFormatado = String(i).padStart(2, '0');
    dias.push(diaFormatado);
  }
  return dias;
};

const isFimDeSemana = (dia) => {
  const data = new Date(ANO_BASE, MES_BASE, parseInt(dia));
  const diaDaSemana = data.getDay();
  return diaDaSemana === 0 || diaDaSemana === 6;
};

const Cardapio = () => {
  const diaRefs = useRef({});
  const [cardapio, setCardapio] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const agruparPorDia = (data) => {
  const dias = {};
  let ultimoDiaValido = null;

  data.forEach((item) => {
    let dia = null;
    const match = item.data.match(/^(\d{2})/);

    if (match) {
      dia = match[1];
      ultimoDiaValido = dia;
    } else if (ultimoDiaValido) {
      dia = ultimoDiaValido;
    } else {
      return;
    }
    
    let tipoRefeicao = ''; 

    const dataString = item.data.toUpperCase(); 
    const isAlmoco = dataString.includes('ALMOÇO') || dataString.includes('ALMOCO');

    if (isAlmoco) {
      tipoRefeicao = 'ALMOCO';
    } else { 
      tipoRefeicao = 'JANTAR';
    }
    
    console.log(`Dia: ${dia}, Data: ${item.data}, Tipo Detectado: ${tipoRefeicao}`);
    
    if (!dias[dia]) dias[dia] = {};
    dias[dia][tipoRefeicao] = item;
  });
  return dias;
};

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

        const diasAgrupados = agruparPorDia(data);
        setCardapio(diasAgrupados);
        
        if (Object.keys(diasAgrupados).length > 0) {
          const diasOrdenados = Object.keys(diasAgrupados).sort((a, b) => parseInt(a) - parseInt(b));
          setSelectedDay(diasOrdenados[0]); 
      }
      })
      .catch((err) => console.error('Erro ao carregar cardápio:', err));
  }, []);

  const navigate = useNavigate();
  const paginaInicial = () => navigate('/');

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

      <div className="dias-da-semana">
        {diasDaSemana.map((label, index) => (
            <div key={index} className="dia-label">
                {label}
            </div>
        ))}
    </div>

      <div className="dias-botoes">
        {Array(getPlaceholderCount(ANO_BASE, MES_BASE)).fill(null).map((_, index) => (
        <div key={`ph-${index}`} className="dia-placeholder" />
    ))}
        {gerarTodosOsDiasDoMes().map((dia) => {
          const diaData = cardapio[dia];

          const isAlmocoFeriado = diaData?.ALMOCO?.['prato_principal'] === 'FERIADO';
          const isJantarFeriado = diaData?.JANTAR?.['prato_principal'] === 'FERIADO';
          const isFeriado = isAlmocoFeriado || isJantarFeriado;

          const temCardapio = !!diaData
          const isFDS = isFimDeSemana(dia);
          
          const isClicavel = temCardapio && !isFDS && !isFeriado;

          const classeBotao = `dia-btn ${selectedDay === dia ? 'active' : ''} ${!isClicavel ? 'disabled-btn' : ''}`;
            
          let tooltip = '';
          if (isFeriado) {
            tooltip = 'Feriado';
          } else if (isFDS) {
            tooltip = 'Fim de Semana';
          }

          return (
            <button
              key={dia}
              className={classeBotao}
              onClick={() => isClicavel && irParaDia(dia)}
              title={tooltip}
              disabled={!isClicavel}
            >
              {dia}
            </button>
          );
        })}
      </div>

      {Object.entries(cardapio)
      .sort(([diaA], [diaB]) => parseInt(diaA) - parseInt(diaB))
      .map(([dia, diaData]) => {
          
          const isFeriadoAlmoco = diaData?.ALMOCO?.prato_principal === 'FERIADO';
          const isFeriadoJantar = diaData?.JANTAR?.prato_principal === 'FERIADO';
          const isDiaFeriado = isFeriadoAlmoco || isFeriadoJantar;

          if (isDiaFeriado) {
              return null
          }

          return (
            <div
              key={dia}
              className={`dia ${selectedDay === dia ? 'active' : ''}`}
              ref={(el) => (diaRefs.current[dia] = el)}
            >
              <h2>Dia {dia}</h2>
              <div className='dia-div'>
                  {Object.entries(diaData).map(([tipo, item]) => (
                      <div key={tipo} className="refeicao">
                        <h3>{tipo === 'ALMOCO' ? 'ALMOÇO' : 'JANTAR'}</h3>
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
          );
      })}

      {showButton && (
        <button className="scroll-top-button" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Cardapio;