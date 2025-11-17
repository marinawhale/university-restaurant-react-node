import './Footer.css'
import { Github, Linkedin, Mail } from 'lucide-react'
import logo from '../assets/logo.png'

const irParaGitHub = () => {
    window.open('https://github.com/marinawhale', '_blank');
}

const irParaLinkedin = () => {
    window.open('https://www.linkedin.com/in/marina-ferrari-b10456244', '_blank');
}

const irParaEmail = () => {
    window.open('mailto:marinaferrarim@gmail.com', '_blank');
}

const irParaUFSJ = () => {
    window.location.href = 'https://www.ufsj.edu.br'
  }

const Footer = () => {
    return (
        <header className="footer">
            <div className='footer-container'>
                <div className='footer-txt'>
                <div className='footer-logo' onClick={irParaUFSJ}>
                    <img src={logo} alt="Logo UFSJ" />
                    <p>Universidade Federal de São João del-Rei</p>
                </div>
                <p>Imagens meramente ilustrativas</p>
                <p>Este projeto não é de autoria da UFSJ</p>
            </div>
            <div className='footer-contato'>
                <p><b>Contato UFSJ (CAP):</b></p>
                <a href="https://ufsj.edu.br/cap">https://ufsj.edu.br/cap</a>
                <p>(31) 3749-7300 / 3749-7301</p>
                <p>MG 443, KM 7 Fazenda do Cadete, Ouro Branco - MG 36495-000</p>
            </div>
            <div className='footer-personals'>
                <div className='footer-nome'>
                    <p>Criado por: <b>Marina Ferrari Monteiro</b></p>
                </div>
                <div className='footer-icons'>
                    <div className="github" onClick={irParaGitHub}>
                        <p><Github /></p>
                    </div>
                    <div className="linkedin" onClick={irParaLinkedin}>
                        <p><Linkedin /></p>
                    </div>
                    <div className="email" onClick={irParaEmail}>
                        <p><Mail /></p>
                    </div>
                </div>
            </div>
            </div>
        </header>
      )
}

export default Footer