import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search } from 'lucide-react';
import './AddressAutocomplete.css';

const AddressAutocomplete = ({ onAddressSelect, initialValue }) => {
    const [query, setQuery] = useState(initialValue || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Close suggestions when clicking outside
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 3 && showSuggestions) {
                fetchSuggestions(query);
            } else if (query.length <= 3) {
                setSuggestions([]);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [query, showSuggestions]);

    const fetchSuggestions = async (searchText) => {
        setIsLoading(true);
        try {
            // Nominatim API - restricted to Chile
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&countrycodes=cl&addressdetails=1&limit=5`,
                {
                    headers: {
                        'User-Agent': 'FletesMatcrisWeb/1.0'
                    }
                }
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleSelect = (item) => {
        setQuery(item.display_name);
        setShowSuggestions(false);
        onAddressSelect({
            address: item.display_name,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon)
        });
    };

    return (
        <div className="autocomplete-wrapper" ref={wrapperRef}>
            <div className="input-icon-wrapper">
                <MapPin size={18} className="input-icon" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Calle, Número, Comuna (Ej: Coquimbo 621, Santiago)"
                    className="autocomplete-input"
                />
                {isLoading && <div className="loading-spinner"></div>}
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((item) => (
                        <li key={item.place_id} onClick={() => handleSelect(item)}>
                            <Search size={14} />
                            <span>{item.display_name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
