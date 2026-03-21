import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Search, X } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  isWeekend, 
  startOfToday,
  addDays,
  subDays,
  isSameDay
} from 'date-fns';

import Doggo from '../assets/doggo.png';
import './Cardapio.css';

const CARDAPIO_PATH = '/cardapio.json';
const diasDaSemanaLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const Cardapio = () => {
    const [hoje] = useState(startOfToday());
    const [cardapio, setCardapio] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [shouldScroll, setShouldScroll] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const diaRefs = useRef({});

    const navigate = useNavigate();

    const inicioDoMes = startOfMonth(hoje);
    const fimDoMes = endOfMonth(hoje);
    const diasDoMes = eachDayOfInterval({ start: inicioDoMes, end: fimDoMes });
    const placeholders = Array(getDay(inicioDoMes)).fill(null);

    const normalizeText = (text) => {
        return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const isFeriadoNoCardapio = (diaStr) => {
        const diaData = cardapio[diaStr];
        return diaData?.ALMOCO?.prato_principal === 'FERIADO' || diaData?.JANTAR?.prato_principal === 'FERIADO';
    };

    const checkEmenda = (date) => {
        const diaSemana = getDay(date);
        if (diaSemana === 1) {
            return isFeriadoNoCardapio(format(addDays(date, 1), 'dd'));
        }
        if (diaSemana === 5) {
            return isFeriadoNoCardapio(format(subDays(date, 1), 'dd'));
        }
        return false;
    };

    const agruparPorDia = (data) => {
        const dias = {};
        let ultimoDiaValido = null;

        data.forEach((item) => {
            if (item.data.toUpperCase().startsWith('OBSERVAÇÕES')) return;
            
            let dia = null;
            const match = item.data.match(/^(\d{2})/);
            if (match) {
                dia = match[1];
                ultimoDiaValido = dia;
            } else if (ultimoDiaValido) {
                dia = ultimoDiaValido;
            } else return;

            const tipoRefeicao = (item.data.toUpperCase().includes('ALMOÇO') || item.data.toUpperCase().includes('ALMOCO')) 
                ? 'ALMOCO' : 'JANTAR';
            
            if (!dias[dia]) dias[dia] = {};
            dias[dia][tipoRefeicao] = item;
        });
        return dias;
    };

    const irParaDia = (dia) => {
        setSelectedDay(dia);
        setShouldScroll(true);
        if (showCalendar) setShowCalendar(false);
        if (showSearch) setShowSearch(false);
    };

    const aplicarFiltroEIrParaDia = (dia) => {
        setActiveSearchTerm(searchInput);
        irParaDia(dia);
    };

    const limparBuscaAtiva = () => {
        setActiveSearchTerm('');
        setSearchInput('');
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    useEffect(() => {
        fetch(CARDAPIO_PATH)
            .then(res => res.json())
            .then(data => {
                const agrupados = agruparPorDia(data);
                setCardapio(agrupados);
                
                const diaAtualStr = format(hoje, 'dd');
                if (agrupados[diaAtualStr]) {
                    setSelectedDay(diaAtualStr);
                } else {
                    const primeiroDiaValido = Object.keys(agrupados).sort()[0];
                    setSelectedDay(primeiroDiaValido);
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Erro:', err);
                setIsLoading(false);
            });
    }, [hoje]);

    useEffect(() => {
        const handleScroll = () => setShowButton(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isLoading && shouldScroll && selectedDay) {
            const target = diaRefs.current[selectedDay];
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setShouldScroll(false);
                }, 100);
            }
        }
    }, [selectedDay, shouldScroll, isLoading]);

    const filterCardapio = (term) => {
        const normalizedTerm = normalizeText(term);
        if (!normalizedTerm) return {};
        const filtered = {};

        Object.entries(cardapio).forEach(([dia, diaData]) => {
            const matches = {};
            Object.entries(diaData).forEach(([tipo, item]) => {
                const itemMatches = Object.values(item).some(val => normalizeText(val).includes(normalizedTerm));
                if (itemMatches) matches[tipo] = item;
            });
            if (Object.keys(matches).length > 0) filtered[dia] = matches;
        });
        return filtered;
    };

    const displayCardapio = activeSearchTerm ? filterCardapio(activeSearchTerm) : cardapio;
    const modalResults = filterCardapio(searchInput);

    return (
        <div className="cardapio-container">
            <div className='cardapio-botoes'>
                <div className='cardapio-btn' onClick={() => navigate('/')}><p>VOLTAR</p></div>
                <div className='cardapio-btn' onClick={() => setShowSearch(true)}><p>PESQUISAR</p></div>
                <div className='cardapio-btn' onClick={() => setShowCalendar(true)}><p>ABRIR CALENDÁRIO</p></div>
            </div>

            {activeSearchTerm && (
                <div className="active-filter-bar">
                    <p>Resultados para: "{activeSearchTerm}"</p>
                    <button className="clear-filter-btn" onClick={limparBuscaAtiva}>
                        <X size={16} /> Limpar
                    </button>
                </div>
            )}

            {isLoading ? (
                <div className="loading-message-container">
                    <h1>Carregando Cardápio...</h1>
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <>
                    {showSearch && (
                        <div>
                            <div className="calendario-overlay" onClick={() => setShowSearch(false)}></div>
                            <div className='calendario-flutuante search-flutuante'>
                                <h3>Buscar no Cardápio</h3>
                                <input 
                                    type="text" 
                                    placeholder="Ex: strogonoff..." 
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    autoFocus
                                />
                                <div className="dias-botoes search-days">
                                    {Object.keys(modalResults).length > 0 ? (
                                        Object.keys(modalResults).sort().map(dia => (
                                            <button key={dia} className="dia-btn" onClick={() => aplicarFiltroEIrParaDia(dia)}>{dia}</button>
                                        ))
                                    ) : <p className="no-results">{searchInput ? "Nada encontrado" : "Digite para buscar"}</p>}
                                </div>
                                <div className="fechar-calendario-btn"><p onClick={() => setShowSearch(false)}>FECHAR</p></div>
                            </div>
                        </div>
                    )}

                    {showCalendar && (
                        <div>
                            <div className="calendario-overlay" onClick={() => setShowCalendar(false)}></div>
                            <div className='calendario-flutuante'>
                                <div className="dias-da-semana">
                                    {diasDaSemanaLabels.map((l, i) => <div key={i} className="dia-label">{l}</div>)}
                                </div>
                                <div className="dias-botoes">
                                    {placeholders.map((_, i) => <div key={`ph-${i}`} className="dia-placeholder" />)}
                                    {diasDoMes.map((date) => {
                                        const diaStr = format(date, 'dd');
                                        const isFeriado = isFeriadoNoCardapio(diaStr);
                                        const isEmenda = checkEmenda(date);
                                        const isFDS = isWeekend(date);
                                        const isClicavel = cardapio[diaStr] && !isFeriado && !isEmenda && !isFDS;

                                        return (
                                            <button
                                                key={diaStr}
                                                className={`dia-btn ${selectedDay === diaStr ? 'active' : ''} ${!isClicavel ? 'disabled-btn' : ''}`}
                                                disabled={!isClicavel}
                                                onClick={() => irParaDia(diaStr)}
                                                title={isFeriado ? 'FERIADO' : isEmenda ? 'RECESSO' : isFDS ? 'Fim de semana' : ''}
                                            >
                                                {format(date, 'd')}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="fechar-calendario-btn"><p onClick={() => setShowCalendar(false)}>FECHAR</p></div>
                            </div>
                        </div>
                    )}

                    {Object.entries(displayCardapio)
                        .sort(([a], [b]) => parseInt(a) - parseInt(b))
                        .map(([dia, diaData]) => {
                            if (isFeriadoNoCardapio(dia)) return null;
                            return (
                                <div key={dia} className={`dia ${selectedDay === dia ? 'active' : ''}`} ref={el => diaRefs.current[dia] = el}>
                                    <h2>Dia {dia}</h2>
                                    <div className='dia-div'>
                                        {Object.entries(diaData).map(([tipo, item]) => (
                                            <div key={tipo} className="refeicao">
                                                <h3>{tipo === 'ALMOCO' ? 'ALMOÇO' : 'JANTAR'}</h3>
                                                <p><strong>Prato principal:</strong> {item.prato_principal}</p>
                                                <p><strong>Vegetariano:</strong> {item.vegetariano}</p>
                                                <p><strong>Guarnição:</strong> {item.guarnicao}</p>
                                                <p><strong>Suco:</strong> {item.suco}</p>
                                                <p><strong>Sobremesa:</strong> {item.sobremesa}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                    {showButton && (
                        <div className="floating-actions">
                            <button className="scroll-top-btn" onClick={scrollToTop}>↑</button>
                            <button className="calendar-btn" onClick={() => setShowCalendar(true)}><CalendarDays /></button>
                            <button className="search-flutuante-btn" onClick={() => setShowSearch(true)}><Search /></button>
                        </div>
                    )}

                    <div className='tchau'>
                        <img src={Doggo} alt="Doggo" />
                        <p>Obrigada por ver até aqui</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cardapio;