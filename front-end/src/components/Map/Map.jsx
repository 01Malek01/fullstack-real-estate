import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker'

function Map({ city, country, address }) {
 return (
  <div>
   <MapContainer
    center={[51.505, -0.09]}
    zoom={1}
    scrollWheelZoom={false}
    style={{ height: '40vh', width: '100%', marginTop: '20px', zIndex: 0 }}

   >
    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
    <GeoCoderMarker address={address} city={city} country={country} />
   </MapContainer>
  </div>
 )
}

export default Map
