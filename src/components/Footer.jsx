import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import './Footer.css';

import content from '../data/siteContent.json';

const Footer = () => {
    const { general, footer } = content;

    return (
        <footer className="footer" id="contacto">
            <div className="container footer-container">
                <div className="footer-section">
                    <h3>Fletes Matcris</h3>
                    <p>{footer?.text || "Servicio de mudanzas y fletes profesional, seguro y confiable en todo Chile."}</p>
                </div>

                <div className="footer-section">
                    <h3>Contacto</h3>
                    <ul className="contact-list">
                        <li>
                            <Phone size={18} />
                            <a href={general.whatsappLink || "https://wa.me/56953303129"}>{general.phone || "+56 9 5330 3129"}</a>
                        </li>
                        <li>
                            <Instagram size={18} />
                            <a href={general.instagramLink || "https://instagram.com/fletesmatcris"}>@fletesmatcris</a>
                        </li>
                        <li>
                            <MapPin size={18} />
                            <span>Santiago, Chile</span>
                        </li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Horario</h3>
                    <p>Lunes a Domingo</p>
                    <p>24/7 Previa coordinación</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>{footer?.copyright || `© ${new Date().getFullYear()} Fletes Matcris. Todos los derechos reservados.`}</p>
            </div>
        </footer>
    );
};

export default Footer;
