import React from 'react';
import truckImage from '../assets/truck.png';
import content from '../data/siteContent.json';
import './Hero.css';

const Hero = () => {
    const { hero } = content;

    return (
        <section className="hero" id="inicio">
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">{hero.title}</h1>
                    <p className="hero-subtitle">{hero.subtitle}</p>
                    <div className="hero-actions">
                        <a href="#cotizar" className="btn btn-primary">{hero.buttonText}</a>
                        <a href="#contacto" className="btn btn-accent">Contáctanos</a>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="image-bg"></div>
                    <img src={truckImage} alt="Camión Foton TM3 de Fletes Matcris" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
