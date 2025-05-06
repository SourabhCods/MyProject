import React, { useEffect, useState } from 'react';
import { OlaMaps } from 'olamaps-web-sdk';
import axios from 'axios';
import './map.css';
import { Divider, Input } from 'antd';
const Map = ({ onAddressSelect }) => {
    const [placesArr, setPlacesArr] = useState([]);
    const [predictionArr , setPredictionArr] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const olaMaps = new OlaMaps({
            apiKey: 'sq493iTx56Um82R5YhSCjQALLZum2hoWCQvXglZo',
        });

        const myMap = olaMaps.init({ zoom: 50 });
        const geolocate = olaMaps.addGeolocateControls({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
        });

        const reverseGeocode = async (lng, lat) => {
            try {
                const res = await axios.get(
                    `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=sq493iTx56Um82R5YhSCjQALLZum2hoWCQvXglZo`
                );
                setPlacesArr(res.data.results);
            } catch (e) {
                console.log(e);
            }
        };

        myMap.addControl(geolocate);

        myMap.on('load', () => {
            geolocate.trigger();

            geolocate.on('geolocate', (position) => {
                const { longitude, latitude } = position.coords;

                const marker = olaMaps.addMarker({
                    offset: [0, -10],
                    anchor: 'bottom',
                    color: 'rgb(247 , 147 , 0)',
                    draggable: true,
                });

                marker.setLngLat([longitude, latitude]).addTo(myMap)
                reverseGeocode(longitude, latitude)
                marker.on("dragend", () => {
                    const {lng , lat} = marker.getLngLat()
                    reverseGeocode(lng, lat)
                })
            });
        });
    }, []);

    const onLocationEnter = async(e) => {
        try {
                const res = await axios.get(
                    `https://api.olamaps.io/places/v1/autocomplete?input=${e.target.value}&api_key=sq493iTx56Um82R5YhSCjQALLZum2hoWCQvXglZo`
                );
                // setPlacesArr(res.data.results);
                setPredictionArr(res.data.predictions)
            } catch (e) {
                console.log(e)
        }
                
    }

    const handleAddressClick = (address) => {
        setSelectedAddress(address);
        if (onAddressSelect) {
            onAddressSelect(address); // Pass selected address to parent
        }
    };

    return (
        <div className="container">
            <p style={{fontFamily:  "cursive"}}>Search For Your Nearby Location</p>
            <Input type='text' onChange={onLocationEnter} id='location-input'/> 
            <div className='nearby-locations'>
                {
                    predictionArr.map((obj) => (
                        <>
                            <div onClick={() => handleAddressClick(obj.description)} id="predicted-locations">{obj.description}</div>
                        </>
                    ))
                }
            </div>

            <Divider variant='dotted' style={{ borderColor: 'black', marginTop : "4.5rem", marginBottom : "4.5rem" }}>OR</Divider>

            <p style={{fontFamily:  "cursive"}}>Drag The Marker To See Places Near You</p>

            <div id="map" className="map-container"></div>

            <div className="address-list">
                <h2 className="heading">What's Near You</h2>
                {placesArr.length === 0 ? (
                    <p className="loading-text">Move the marker to see nearby addresses</p>
                ) : (
                    placesArr.map((obj, index) => (
                        <div
                            key={index}
                            onClick={() => handleAddressClick(obj.formatted_address)}
                            className={`address-card ${
                                selectedAddress === obj.formatted_address ? 'selected-card' : ''
                            }`}
                        >
                            {obj.formatted_address}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Map;
