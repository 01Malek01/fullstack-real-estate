//configure leaflet GeocoderMarker , position,icon etc...

import React, { useEffect, useState } from 'react';
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // for leaflet-control-geocoder
import 'leaflet-control-geocoder'; // for leaflet-control-geocoder to translate address to latlng

let DefaultIcon = L.icon({
 iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
 shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

L.Marker.prototype.options.icon = DefaultIcon;

function GeoCoderMarker({ address }) {
 const map = useMap();
 const [position, setPosition] = useState([60, 19]);

 useEffect(() => {
  // Create the geocoder
  const geocoder = L.Control.Geocoder.nominatim();

  //(( Translate address to lat and long))
  geocoder.geocode(address, (results) => {
   if (results && results.length > 0) {
    const { center } = results[2];
    setPosition([center.lat, center.lng]);
    map.flyTo([center.lat, center.lng], 6);
   }
  });
 }, [address, map]);

 return (
  <Marker position={position} icon={DefaultIcon}>
   <Popup>{address}</Popup> {/* display address with popup on marker */}
  </Marker>
 );
}

export default GeoCoderMarker;
