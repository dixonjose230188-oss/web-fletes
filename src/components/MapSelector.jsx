import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for Leaflet default icon issue in React
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ setPosition, onLocationSelect, externalPosition }) => {
    const [markerPos, setMarkerPos] = useState(null);

    useEffect(() => {
        if (externalPosition) {
            setMarkerPos(externalPosition);
        }
    }, [externalPosition]);

    const map = useMapEvents({
        click(e) {
            setMarkerPos(e.latlng);
            setPosition(e.latlng);
            onLocationSelect(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return markerPos === null ? null : (
        <Marker position={markerPos}>
            <Popup>Ubicación seleccionada</Popup>
        </Marker>
    );
};

const MapSelector = ({ onLocationSelect, externalPosition }) => {
    const [position, setPosition] = useState(null);
    // Santiago coordinates as default center
    const center = [-33.4489, -70.6693];

    const MapController = () => {
        const map = useMapEvents({});
        useEffect(() => {
            if (externalPosition) {
                map.flyTo(externalPosition, 16);
                setPosition(externalPosition);
            }
        }, [externalPosition, map]);
        return null;
    };

    return (
        <div className="map-container" style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '2px solid #ddd' }}>
            <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker setPosition={setPosition} onLocationSelect={onLocationSelect} externalPosition={externalPosition} />
                <MapController />
            </MapContainer>
            <div style={{ padding: '10px', background: '#f9f9f9', fontSize: '0.9rem', color: '#666' }}>
                <p>Haga clic en el mapa para seleccionar su dirección exacta.</p>
            </div>
        </div>
    );
};

export default MapSelector;
