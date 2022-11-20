import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import * as React from 'react';
import SearchBar from '../components/searchbar';

export default function Map() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });
  
    if (!isLoaded) return (<div>Loading...</div>);
    
    const goodWater = {
        path: "M12.4088 0.833313L11.0024 2.22161C10.5474 2.67076 0 13.2055 0 22.1477C0 28.8851 5.58394 34.3974 12.4088 34.3974C19.2336 34.3974 24.8175 28.8851 24.8175 22.1477C24.8175 13.2463 14.2701 2.67076 13.8151 2.22161L12.4088 0.833313V0.833313ZM6.20438 20.1061C7.36253 20.1061 8.27251 21.0044 8.27251 22.1477C8.27251 24.3935 10.1338 26.231 12.4088 26.231C13.5669 26.231 14.4769 27.1293 14.4769 28.2726C14.4769 29.4159 13.5669 30.3142 12.4088 30.3142C7.85888 30.3142 4.13625 26.6393 4.13625 22.1477C4.13625 21.0044 5.04623 20.1061 6.20438 20.1061Z",
        fillColor: "#25B3E0",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 1,
    }

    const badWater = {
        path: "M12.4088 0.833313L11.0024 2.22161C10.5474 2.67076 0 13.2055 0 22.1477C0 28.8851 5.58394 34.3974 12.4088 34.3974C19.2336 34.3974 24.8175 28.8851 24.8175 22.1477C24.8175 13.2463 14.2701 2.67076 13.8151 2.22161L12.4088 0.833313V0.833313ZM6.20438 20.1061C7.36253 20.1061 8.27251 21.0044 8.27251 22.1477C8.27251 24.3935 10.1338 26.231 12.4088 26.231C13.5669 26.231 14.4769 27.1293 14.4769 28.2726C14.4769 29.4159 13.5669 30.3142 12.4088 30.3142C7.85888 30.3142 4.13625 26.6393 4.13625 22.1477C4.13625 21.0044 5.04623 20.1061 6.20438 20.1061Z",
        fillColor: "#964B00",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 1,
    }
    return (
      <div>
        <div class="d-flex justify-content-center">
            <SearchBar />
        </div>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary " style={{
            position: 'absolute',
            bottom: "5%",
            zIndex: 3,
        }}>Scan this area</button>
        </div>

        <GoogleMap style={{
            position: 'absolute',
            zIndex: 2,
        }}
          mapContainerStyle={{ width: '100vw', height: '100vh' }}
          zoom={20}
          center={{ lat: 51.0769023071639, lng: -114.13136144860931 }}
          options={{ mapId: "b8a0a866c50e62da" }}
        >
          <MarkerF position={{ lat: 51.07654873134196, lng: -114.13192798994598 }} icon={goodWater}/>
          <MarkerF position={{ lat: 51.07659675909463, lng: -114.131879039469 }} icon={goodWater}/>
          <MarkerF position={{ lat: 51.076694920666405, lng: -114.1316094765581 }} icon={badWater}/>
          <MarkerF position={{ lat: 51.07671893449582, lng: -114.13146798965641 }} icon={goodWater}/>
          <MarkerF position={{ lat: 51.076611504118, lng: -114.13132516250411 }} icon={badWater}/>
        </GoogleMap>
      </div>
    );

}