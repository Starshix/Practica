import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import metka from '../../assets/images/metka.svg';

// Фикс для иконок Leaflet в React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ handleInputChange }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initialCoordinates = [54.3272, 48.3978]; // Ульяновск

        const newMap = L.map('map').setView(initialCoordinates, 13);

        // Стильная tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(newMap);

        // Кастомная иконка в стиле сайта
        const customIcon = L.icon({
            iconUrl: metka,
            iconSize: [35, 45],
            iconAnchor: [17, 45],
            popupAnchor: [0, -45],
            shadowUrl: null
        });

        const newMarker = L.marker(initialCoordinates, {
            draggable: true,
            icon: customIcon
        }).addTo(newMap);

        // События маркера
        newMarker.on('dragend', function (event) {
            const position = newMarker.getLatLng();
            reverseGeocode(position.lat, position.lng);
        });

        newMap.on('click', function (event) {
            const position = event.latlng;
            reverseGeocode(position.lat, position.lng);
            newMarker.setLatLng(position);
        });

        // Инициализация с определением адреса
        reverseGeocode(initialCoordinates[0], initialCoordinates[1]);

        setMap(newMap);
        setMarker(newMarker);
        setIsLoading(false);

        return () => {
            newMap.remove();
        };
    }, [handleInputChange]);

    const reverseGeocode = async (lat, lng) => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=ru`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.address) {
                const address = formatAddress(data.address);
                handleInputChange(address);
            } else {
                handleInputChange('Адрес не найден');
            }
        } catch (error) {
            console.error('Ошибка при геокодинге:', error);
            handleInputChange('Ошибка определения адреса');
        }
    };

    const formatAddress = (address) => {
        const parts = [];
        if (address.road) parts.push(address.road);
        if (address.house_number) parts.push(address.house_number);
        if (address.city || address.town || address.village) {
            parts.push(address.city || address.town || address.village);
        }
        return parts.join(', ');
    };

    return (
        <div className="map-container">
            <div className="map-header">
                <h3>Выберите адрес доставки на карте</h3>
                <p>Кликните на карту или перетащите маркер для выбора адреса</p>
            </div>
            {isLoading && <div className="map-loading">Загрузка карты...</div>}
            <div id="map" className="map-element" />
            <div className="map-instructions">
                <div className="instruction-item">
                    <span className="instruction-icon">📍</span>
                    <span>Кликните на карту для выбора адреса</span>
                </div>
                <div className="instruction-item">
                    <span className="instruction-icon">👆</span>
                    <span>Перетащите маркер для точного позиционирования</span>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;