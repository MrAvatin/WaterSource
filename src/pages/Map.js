import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import * as React from 'react';

export default function Map() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
  
    if (!isLoaded) return (<div>Loading...</div>);
  
    return (
        <GoogleMap
          mapContainerStyle={{ width: '100vw', height: '100vh' }}
          zoom={20}
          center={{ lat: 41.3851, lng: 2.1734 }}
          options={{ mapId: "b8a0a866c50e62da" }}
        >
          <MarkerF position={{ lat: 41.3851, lng: 2.1734 }} />
        </GoogleMap>
      );
  }