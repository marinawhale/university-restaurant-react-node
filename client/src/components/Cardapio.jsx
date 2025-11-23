import { useEffect, useState, useRef } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Search, X } from 'lucide-react'; 
import Doggo from '../assets/doggo.png'
import './Cardapio.css';

const CARDAPIO_PATH = '/cardapio.json';

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

const isEmendaDeFeriado = (diaAtual, cardapio) => {
    const diaNum = parseInt(diaAtual);
    
    const data = new Date(ANO_BASE, MES_BASE, diaNum);
    const diaDaSemana = data.getDay();

    if (diaDaSemana === 1) { 
        const diaTer = String(diaNum + 1).padStart(2, '0');
        const dataTer = cardapio[diaTer];
        if (dataTer?.ALMOCO?.prato_principal === 'FERIADO' || dataTer?.JANTAR?.prato_principal === 'FERIADO') {
            return true;
        }
    }

    if (diaDaSemana === 5) {
        const diaQui = String(diaNum - 1).padStart(2, '0');
        const dataQui = cardapio[diaQui];
        if (dataQui?.ALMOCO?.prato_principal === 'FERIADO' || dataQui?.JANTAR?.prato_principal === 'FERIADO') {
            return true;
        }
    }
    return false;
};

const normalizeText = (text) => {
    return String(text)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

const Cardapio = () => {
    const diaRefs = useRef({});
    const isInitialLoad = useRef(true); 
    
    // NOVO ESTADO: Controla se o scroll deve ser disparado após a seleção de um dia
    const [shouldScroll, setShouldScroll] = useState(false); 
    
    const [cardapio, setCardapio] = useState({});
    const [showButton, setShowButton] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    
    const [searchInput, setSearchInput] = useState(''); 
    const [activeSearchTerm, setActiveSearchTerm] = useState(''); 
    
    const [isLoading, setIsLoading] = useState(true); 
    const diasBotoesRef = useRef(null);

    const agruparPorDia = (data) => {
        const dias = {};
        let ultimoDiaValido = null;

        data.forEach((item) => {
            if (item.data.toUpperCase().startsWith('OBSERVAÇÕES')) {
                return;
            }
            
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
            
            if (!dias[dia]) dias[dia] = {};
            dias[dia][tipoRefeicao] = item;
        });
        return dias;
    };

    const abrirCalendario = () => {
        setShowCalendar(true);
        setShowSearch(false);
        if (activeSearchTerm) {
            setActiveSearchTerm('');
        }
    };

    const fecharCalendario = () => {
        setShowCalendar(false);
    };
    
    const abrirPesquisa = () => {
        setShowSearch(true);
        setShowCalendar(false);
        setSearchInput(activeSearchTerm);
    };
    
    const fecharPesquisa = () => {
        setShowSearch(false);
        setSearchInput(''); 
    };
    
    const limparBuscaAtiva = () => {
        setActiveSearchTerm('');
        setSearchInput('');
        scrollToTop(); 
    }

    

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) setShowButton(true);
            else setShowButton(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleEsc = (event) => {
            if (showCalendar && event.key === 'Escape') {
                fecharCalendario();
            }
            if (showSearch && event.key === 'Escape') {
                fecharPesquisa();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [showCalendar, showSearch]);

    // Efeito para buscar os dados e definir o dia inicial
    useEffect(() => {
        fetch(CARDAPIO_PATH)
            .then((res) => res.json())
            .then((data) => {
                const diasAgrupados = agruparPorDia(data);
                setCardapio(diasAgrupados);
                
                if (Object.keys(diasAgrupados).length > 0) {
                    const diasOrdenados = Object.keys(diasAgrupados).sort((a, b) => parseInt(a) - parseInt(b));
                    setSelectedDay(diasOrdenados[0]); 
                }
                
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Erro ao carregar cardápio:', err);
                
                setIsLoading(false);
            });
    }, []);

    const navigate = useNavigate();
    const paginaInicial = () => navigate('/');
    
    const aplicarFiltroEIrParaDia = (dia) => {
        setSelectedDay(dia);
        setShouldScroll(true); // ATIVA O SCROLL NA PRÓXIMA RENDERIZAÇÃO
        
        if (searchInput.length > 0) {
            setActiveSearchTerm(searchInput);
        } else {
            setActiveSearchTerm(''); 
        }
        
        fecharPesquisa(); 
    };

    const irParaDia = (dia) => {
        setSelectedDay(dia);
        setShouldScroll(true); // ATIVA O SCROLL NA PRÓXIMA RENDERIZAÇÃO
        
        if (showCalendar) fecharCalendario();
    };
    
    // useEffect FINAL e CORRIGIDO para tratar o scroll
    useEffect(() => {
        // BLOQUEIO GERAL: Se estiver carregando ou a flag não foi ativada, sai.
        if (isLoading || !shouldScroll) {
            return;
        }
        
        // BLOQUEIO INICIAL (do problema anterior): Permite que a primeira definição de selectedDay
        // ocorra sem scroll, e desativa a flag isInitialLoad para sempre.
        if (isInitialLoad.current && selectedDay) {
            isInitialLoad.current = false;
        }

        // EXECUTA O SCROLL
        if (selectedDay) {
            const targetElement = diaRefs.current[selectedDay];
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100); 
            }
        }
        
        // Resetar a flag para que o scroll não ocorra novamente em outras mudanças de estado.
        setShouldScroll(false); 

    // O useEffect agora só reage a selectedDay (que indica o dia) e shouldScroll (que autoriza a ação).
    }, [selectedDay, shouldScroll, isLoading]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    const filterCardapio = (term) => {
        const normalizedTerm = normalizeText(term);
        
        if (!normalizedTerm) {
            return {};
        }

        const filtered = {};

        Object.entries(cardapio).forEach(([dia, diaData]) => {
            const matches = {};
            
            Object.entries(diaData).forEach(([tipo, item]) => {
                const itemMatches = Object.values(item).some(value => {
                    const normalizedValue = normalizeText(value);
                    return normalizedValue.includes(normalizedTerm);
                });

                if (itemMatches) {
                    matches[tipo] = item;
                }
            });

            if (Object.keys(matches).length > 0) {
                filtered[dia] = matches;
            }
        });

        return filtered;
    };

    const resultsForDisplay = filterCardapio(activeSearchTerm);
    const displayCardapio = activeSearchTerm.length > 0 ? resultsForDisplay : cardapio;
    
    const modalResults = filterCardapio(searchInput);
    const currentModalResults = searchInput.length > 0 ? modalResults : {};


    return (
        <div className="cardapio-container">
            <div className='cardapio-botoes'>
                <div className='cardapio-btn' onClick={paginaInicial}>
                    <p>VOLTAR</p>
                </div>
                <div className='cardapio-btn' onClick={abrirPesquisa}>
                    <p>PESQUISAR</p>
                </div>
                <div className='cardapio-btn' onClick={abrirCalendario}>
                    <p>ABRIR CALENDÁRIO</p>
                </div>
            </div>

            {activeSearchTerm.length > 0 && (
                <div className="active-filter-bar">
                    <p>Mostrando resultados para: "{activeSearchTerm}"</p>
                    <button className="clear-filter-btn" onClick={limparBuscaAtiva}>
                        <X size={16} /> Limpar Busca
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
                            <div className="calendario-overlay" onClick={fecharPesquisa}></div>
                            <div className='calendario-flutuante search-flutuante'>
                                <h3>Buscar no Cardápio</h3>
                                <input
                                    type="text"
                                    placeholder="Ex: maçã, feijoada, strogonoff..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    autoFocus
                                />
                                
                                {searchInput.length > 0 && (
                                    <div className="search-results-summary">
                                        Encontrados {Object.keys(currentModalResults).length} dias que correspondem a "{searchInput}".
                                    </div>
                                )}
                                
                                <div className="dias-botoes search-days" ref={diasBotoesRef}>
                                    {Object.keys(currentModalResults).length > 0 ? (
                                        Object.keys(currentModalResults).sort((a, b) => parseInt(a) - parseInt(b)).map((dia) => (
                                            <button
                                                key={dia}
                                                className={`dia-btn ${selectedDay === dia ? 'active' : ''}`}
                                                onClick={() => { aplicarFiltroEIrParaDia(dia); }} 
                                            >
                                                {dia}
                                            </button>
                                        ))
                                    ) : searchInput.length > 0 ? (
                                        <p className="no-results">Nenhum resultado encontrado.</p>
                                    ) : (
                                        <p className="no-results">Digite algo para começar a pesquisar.</p>
                                    )}
                                </div>
                                
                                <div className="fechar-calendario-btn">
                                    <p onClick={fecharPesquisa}>FECHAR</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {showCalendar && (
                        <div>
                            <div className="calendario-overlay" onClick={fecharCalendario}></div>
                            <div className='calendario-flutuante'>
                                <div className="dias-da-semana">
                                    {diasDaSemana.map((label, index) => (
                                        <div key={index} className="dia-label">
                                            {label}
                                        </div>
                                    ))}
                                </div>

                                <div className="dias-botoes" ref={diasBotoesRef}>
                                    {Array(getPlaceholderCount(ANO_BASE, MES_BASE)).fill(null).map((_, index) => (
                                        <div key={`ph-${index}`} className="dia-placeholder" />
                                    ))}
                                    {gerarTodosOsDiasDoMes().map((dia) => {
                                        const diaData = cardapio[dia];

                                        const isAlmocoFeriado = diaData?.ALMOCO?.['prato_principal'] === 'FERIADO';
                                        const isJantarFeriado = diaData?.JANTAR?.['prato_principal'] === 'FERIADO';
                                        const isFeriadoProprio = isAlmocoFeriado || isJantarFeriado;
                                        
                                        const isEmenda = isEmendaDeFeriado(dia, cardapio);

                                        const temCardapio = !!diaData
                                        const isFDS = isFimDeSemana(dia);
                                        
                                        const isClicavel = temCardapio && !isFDS && !isFeriadoProprio && !isEmenda;

                                        const classeBotao = `dia-btn ${selectedDay === dia ? 'active' : ''} ${!isClicavel ? 'disabled-btn' : ''}`;
                                        
                                        let tooltip = '';
                                        if (isFeriadoProprio) {
                                            tooltip = 'FERIADO';
                                        } else if (isEmenda) {
                                            tooltip = 'RECESSO ACADÊMICO (Emenda de Feriado)';
                                        } else if (isFDS) {
                                            tooltip = 'Fim de Semana';
                                        }

                                        return (
                                            <button
                                                key={dia}
                                                className={classeBotao}
                                                onClick={() => {isClicavel && irParaDia(dia);}}
                                                title={tooltip}
                                                disabled={!isClicavel}
                                            >
                                                {dia}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="fechar-calendario-btn">
                                    <p onClick={fecharCalendario}>FECHAR</p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {Object.entries(displayCardapio)
                        .sort(([diaA], [diaB]) => parseInt(diaA) - parseInt(diaB))
                        .map(([dia, diaData]) => {
                            
                            const isAlmocoFeriado = diaData?.ALMOCO?.prato_principal === 'FERIADO';
                            const isJantarFeriado = diaData?.JANTAR?.prato_principal === 'FERIADO';
                            const isDiaFeriado = isAlmocoFeriado || isJantarFeriado;

                            const isEmenda = isEmendaDeFeriado(dia, cardapio);

                            if (isDiaFeriado || isEmenda) {
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
                        
                    {activeSearchTerm.length > 0 && Object.keys(resultsForDisplay).length === 0 && (
                        <div className="no-results-message">
                            Nenhum prato ou ingrediente encontrado para **"{activeSearchTerm}"** neste mês.
                        </div>
                    )}


                    {showButton && (
                        <div>
                            <button className="scroll-top-btn" onClick={scrollToTop}>
                            ↑
                            </button>
                            <button className="calendar-btn" onClick={abrirCalendario}>
                                <CalendarDays />
                            </button>
                            <button className="search-flutuante-btn" onClick={abrirPesquisa}>
                                <Search />
                            </button>
                        </div>
                    )}
                    <div className='tchau'>
                        <img src={Doggo} alt="" />
                        <p>Obrigada por ver até aqui</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cardapio;