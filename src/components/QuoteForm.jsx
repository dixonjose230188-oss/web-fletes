import React, { useState } from 'react';
import MapSelector from './MapSelector';
import AddressAutocomplete from './AddressAutocomplete';
import content from '../data/siteContent.json';
import { Calendar, Clock, MapPin, User, Phone, FileText, Truck, Package, ArrowUpCircle, Briefcase, Box } from 'lucide-react';
import './QuoteForm.css';

const QuoteForm = () => {
    const { quoteForm } = content;
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        rut: '',
        address: '',
        date: '',
        time: '',
        location: null,
        helper: false,
        accessA: 'Ascensor',
        accessB: 'Ascensor',
        packing: false,
        serviceType: 'Personal', // Personal or Empresarial
        description: ''
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleAddressSelect = (data) => {
        setFormData({
            ...formData,
            address: data.address,
            location: { lat: data.lat, lng: data.lng }
        });
    };

    const handleLocationSelect = (latlng) => {
        setFormData({ ...formData, location: latlng });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format message for WhatsApp
        const message = `Hola Fletes Matcris, me gustaría cotizar un flete:
    
*Tipo de Servicio:* ${formData.serviceType}
*Nombre:* ${formData.name}
*Teléfono:* ${formData.phone}
*RUT:* ${formData.rut}
*Dirección:* ${formData.address}
*Fecha:* ${formData.date}
*Horario:* ${formData.time}

*Detalles del Servicio:*
*¿Necesita Ayudante?:* ${formData.helper ? 'Sí' : 'No'}
*Acceso Punto A (Origen):* ${formData.accessA}
*Acceso Punto B (Destino):* ${formData.accessB}
*¿Servicio de Embalaje?:* ${formData.packing ? 'Sí' : 'No'}

*Descripción de la Carga:*
${formData.description}

${formData.location ? `*Ubicación Mapa:* https://www.google.com/maps?q=${formData.location.lat},${formData.location.lng}` : ''}
    `;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/56953303129?text=${encodedMessage}`, '_blank');
    };

    return (
        <section className="quote-section" id="cotizar">
            <div className="container">
                <h2 className="section-title">{quoteForm?.title || "Cotiza tu Flete"}</h2>
                <p className="section-subtitle">{quoteForm?.subtitle || "Completa el formulario y te responderemos a la brevedad."}</p>

                <div className="form-container">
                    <form onSubmit={handleSubmit} className="quote-form">
                        <div className="form-group full-width service-type-group">
                            <label><Briefcase size={18} /> Tipo de Servicio</label>
                            <div className="radio-group">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="serviceType"
                                        value="Personal"
                                        checked={formData.serviceType === 'Personal'}
                                        onChange={handleChange}
                                    />
                                    <span className="radio-custom"></span>
                                    <span>Personal / Mudanza de Casa</span>
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="serviceType"
                                        value="Empresarial"
                                        checked={formData.serviceType === 'Empresarial'}
                                        onChange={handleChange}
                                    />
                                    <span className="radio-custom"></span>
                                    <span>Empresarial / Oficina</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label><User size={18} /> Nombre y Apellido</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Ej: Juan Pérez" />
                        </div>

                        <div className="form-group">
                            <label><Phone size={18} /> Teléfono</label>
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+56 9 1234 5678" />
                        </div>

                        <div className="form-group">
                            <label><FileText size={18} /> RUT</label>
                            <input type="text" name="rut" required value={formData.rut} onChange={handleChange} placeholder="12.345.678-9" />
                        </div>

                        <div className="form-group full-width">
                            <label><MapPin size={18} /> Dirección</label>
                            <AddressAutocomplete onAddressSelect={handleAddressSelect} initialValue={formData.address} />
                        </div>

                        <div className="form-group">
                            <label><Calendar size={18} /> Fecha Estimada</label>
                            <input type="date" name="date" required value={formData.date} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label><Clock size={18} /> Horario Preferido</label>
                            <input type="time" name="time" required value={formData.time} onChange={handleChange} />
                        </div>

                        <div className="form-group full-width">
                            <label><Box size={18} /> Descripción de la Carga</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describa los muebles, cajas y objetos a transportar..."
                                rows="4"
                                className="textarea-input"
                            ></textarea>
                        </div>

                        <div className="form-group full-width service-options">
                            <h3 className="options-title">Detalles del Servicio</h3>

                            <div className="option-row">
                                <label className="checkbox-label">
                                    <input type="checkbox" name="helper" checked={formData.helper} onChange={handleChange} />
                                    <span className="checkbox-custom"></span>
                                    <span className="label-text"><Truck size={18} /> ¿Necesita Ayudante? (Costo Adicional)</span>
                                </label>
                            </div>

                            <div className="access-options">
                                <div className="form-group">
                                    <label><ArrowUpCircle size={18} /> Acceso Punto A (Origen)</label>
                                    <select name="accessA" value={formData.accessA} onChange={handleChange} className="select-input">
                                        <option value="Ascensor">Ascensor</option>
                                        <option value="Escaleras">Escaleras</option>
                                        <option value="Casa Primer Piso">Casa Primer Piso</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label><ArrowUpCircle size={18} /> Acceso Punto B (Destino)</label>
                                    <select name="accessB" value={formData.accessB} onChange={handleChange} className="select-input">
                                        <option value="Ascensor">Ascensor</option>
                                        <option value="Escaleras">Escaleras</option>
                                        <option value="Casa Primer Piso">Casa Primer Piso</option>
                                    </select>
                                </div>
                            </div>

                            <div className="option-row">
                                <label className="checkbox-label">
                                    <input type="checkbox" name="packing" checked={formData.packing} onChange={handleChange} />
                                    <span className="checkbox-custom"></span>
                                    <span className="label-text"><Package size={18} /> ¿Desea Servicio de Embalaje?</span>
                                </label>
                            </div>
                        </div>

                        <div className="form-group full-width map-wrapper">
                            <label>Confirma tu ubicación en el mapa</label>
                            <MapSelector onLocationSelect={handleLocationSelect} externalPosition={formData.location} />
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">Enviar Cotización por WhatsApp</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default QuoteForm;
