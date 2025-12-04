import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Truck, Package, Archive } from 'lucide-react';
import content from '../data/siteContent.json';
import './Services.css';

const iconMap = {
    transport: Truck,
    removal: Archive,
    packing: Package
};

const Services = () => {
    const { services } = content;

    return (
        <section className="services-section" id="servicios">
            <Helmet>
                <meta name="keywords" content="transporte de carga, retiro de escombros, embalaje mudanza, fletes santiago, camiones de mudanza" />
            </Helmet>
            <div className="container">
                <h2 className="section-title">{services.title}</h2>
                <p className="section-subtitle">{services.subtitle}</p>

                <div className="fleet-section">
                    <h3 className="fleet-title">{services.fleetTitle}</h3>
                    <div className="fleet-image-container">
                        <img
                            src="/assets/trucks-fleet.jpg"
                            alt="Flota de camiones Fletes Matcris"
                            className="fleet-image"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className="services-grid">
                    {services.items.map((service) => {
                        const Icon = iconMap[service.id] || Truck;
                        return (
                            <div className="service-card" key={service.id}>
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} loading="lazy" />
                                    <div className="service-icon">
                                        <Icon size={24} />
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
