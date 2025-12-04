import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Phone, Menu, X, Instagram } from 'lucide-react';
import './Header.css';

import content from '../data/siteContent.json';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { general } = content;

    return (
        <header className="header">
            <div className="container header-container">
                <div className="logo-container">
                    <img src={general.logo || logo} alt="Fletes Matcris" className="logo" />
                </div>

                <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <a href="#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a>
                    <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
                    <a href="#cotizar" onClick={() => setIsMenuOpen(false)}>Cotizar</a>
                    <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>

                    <div className="social-links">
                        <a href={general.whatsappLink} target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
                            <Phone size={18} /> {general.phone}
                        </a>
                        <a href={general.instagramLink} target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                            <Instagram size={18} />
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
