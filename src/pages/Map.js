import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import {Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import SearchBar from '../components/searchbar';
import { Modal } from 'bootstrap'
import fountain from "../img/fountain1.jpg"
import firebase from "firebase/app"
import "firebase/firestore"
import { db, FIREBASE_DB_CONFIG } from '../index';
import { updateSafety } from '../DataHandler';

export default function Map() {
    
    const [markers, setMarkers] = useState([]);
    const [position, setPosition]= useState({ lat: 51.0769023071639, lng: -114.13136144860931 });
    const [selectedMarker, setSelectedMarker] = useState({
        title: "",
        quality: "",
        ID: "",
        safetypoints: "",
        safetytotal: "",
        totalpoints: "",
        totalreviews: "",
    });

    var gbLocs = {};

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
    
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places'],
    });

    function updateSafety(scoreadj) {
        var item = selectedMarker;
        console.log(item);
        console.log("Updating safety for " + item.ID + " to " + item.safetytotal + " and " + item.safetypoints);
        const locRef = db.collection('waterstore').doc(item.ID);  

        const res = locRef.set({
            safetytotal: item.safetytotal + 1,
            safetypoints: item.safetypoints + scoreadj,
          }, { merge: true });
      }

    function markerSelect (lat, long, totalpoints, totalreviews, safetypoints, safetytotal, ID){
        var quality = "Unknown"
        if(totalpoints/totalreviews >= 4 ){
            quality = "Excellent"
        } else if (totalpoints/totalreviews >= 3){
            quality = "Good"
        } else if (totalpoints/totalreviews >= 2){
            quality = "Fair"
        } else if (totalpoints/totalreviews >= 1){
            quality = "Poor"
        } else if (totalpoints/totalreviews >= 0){
            quality = "Very Poor"
        } else {
            quality = "Unknown"
        }

        var title = "Latitude: " + lat + " Longitude: " + long

        var item = {
            title: title,
            quality: quality,
            ID: ID,
            totalpoints: totalpoints,
            totalreviews: totalreviews,
            safetypoints: safetypoints,
            safetytotal: safetytotal,
        }
        setSelectedMarker(item)
        var modal = new Modal(document.getElementById('exampleModal'), {keyboard: false});
        modal.show();
    }

    function searchThisArea(){
        setMarkers(gbLocs);
    }
    
    const fetch = async () => {
      const req = await db.collection('waterstore').get();
      const tempLocs = req.docs.map((doc)=>({...doc.data(), id: doc.id}));
    
      for(let i = 0; i < tempLocs.length; i++) {
        // Determine the correct icon for the marker
        var totalpts = tempLocs[i].totalpoints;
        var totalreviews = tempLocs[i].totalreviews;
        totalpts = totalpts / totalreviews; // average rating
    
        var icoType = goodWater; // TODO: Change default to 'neutral / grey-water'
        // Calculate the rating based on conditionals
        if(totalpts == 0 || totalpts == 2.5)
          icoType = goodWater;
        else if(totalpts < 2.5)
          icoType = badWater;
        else if(totalpts > 2.5)
          icoType = goodWater;
    
        tempLocs[i].icoType = icoType;
    
        // Set list of locations
        gbLocs = tempLocs;
      }
    }

    fetch();
  
    if (!isLoaded) return (<div>Loading...</div>);

    return (
      <div >
        <div class="d-flex justify-content-center">
            <SearchBar />
        </div>
        <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary " style={{
            position: 'absolute',
            bottom: "5%",
            zIndex: 3,
        }} onClick={() => searchThisArea()}>Scan this area</button>
        </div>
        <Link to="/">
        <button type="button"style={{
            position: 'absolute',
            bottom: "5%",
            left: "5%",
            border: "none",
            background: "none",
            zIndex: 4,
        }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#0d6efd" class="bi bi-house-fill" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
            </svg>
        </button>
        </Link>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" style={{
                position: 'absolute',
                height: "90%",
                width: "100%",
                maxWidth: "100%",
                margin: "0",
                bottom: "0",
            }}>
                <div class="modal-content" style={{
                position: 'absolute',
                height: "100%",
                width: "100%",
                
            }}>
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{selectedMarker.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="d-flex justify-content-center">
                    <img src={fountain} alt='Image' style={{
                            borderRadius: "50%",
                            height: "25vh",
                            width: "25vh",
                        }}></img>
                    </div>
                    <br></br>
                    <div class="d-flex justify-content-center">
                        <h5>Water Quality: {selectedMarker.quality}</h5>
                    </div>
                    <br></br>
                    <br></br>
                    <div class="d-flex justify-content-center">
                        <h5>How was the water quality?</h5>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style={{
                            width: "35vw",
                            marginRight: "2vw",
                            maxWidth: "20vh",
                        }}>Bad</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal"style={{
                            width: "35vw",
                            maxWidth: "20vh",
                            marginLeft: "2vw",
                        }}>Good</button>
                    </div>
                    <br></br>
                    <br></br>
                    <div class="d-flex justify-content-center">
                        <h5>Was the area safe?</h5>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style={{
                            width: "35vw",
                            maxWidth: "20vh",
                            marginRight: "2vw",
                        }}>Not Safe</button>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal"style={{
                            width: "35vw",
                            maxWidth: "20vh",
                            marginLeft: "2vw",
                        }}>Safe</button>
                    </div>
                </div>
                

                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={(e) => updateSafety( 0)}>Report </button>
                </div>
                </div>
            </div>
            </div>

        <GoogleMap style={{
            position: 'absolute',
            zIndex: 2,
            }}
            mapContainerStyle={{ width: '100vw', height: '100vh' }}
            zoom={18}
            center={position}
            options={{ mapId: "b8a0a866c50e62da", fullscreenControl: false, streetViewControl: false, mapTypeControl: false }}
        >
            {markers.map(marker => (
                <MarkerF position={{ lat: marker.lat, lng: marker.long }} icon={marker.icoType} key={marker.id} onClick={(e) => markerSelect(marker.lat, marker.long, marker.totalpoints, marker.totalreviews, marker.safetypoints, marker.safetytotal, marker.id)} />
            ))}
        </GoogleMap>
      </div>
    );

}