import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Map from './pages/Map';
import About from './pages/About';
import firebase from "firebase/app"
import "firebase/firestore"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Routes, Route } from "react-router-dom"

const FIREBASE_DB_CONFIG = {
  apiKey: "AIzaSyBFtNlRrb6PZmQYjjpVQoa-hLioRo3f9KY",
  authDomain: "waterstore-2.firebaseapp.com",
  projectId: "waterstore-2",
  storageBucket: "waterstore-2.appspot.com",
  messagingSenderId: "523519992517",
  appId: "1:523519992517:web:c85bdcd7ba711b752486ac",
  measurementId: "G-H8H5QNZ22C"
};

var fbApp = firebase.initializeApp(FIREBASE_DB_CONFIG);
var db = fbApp.firestore();

export { db, FIREBASE_DB_CONFIG };

var gbLocs = "";

export { gbLocs };

const fetch = async () => {
  const req = await db.collection('waterstore').get();
  const tempLocs = req.docs.map((doc)=>({...doc.data(), id: doc.id}));
  console.log(tempLocs);

  for(let i = 0; i < tempLocs.length; i++){
    console.log('Location:', tempLocs[i].lat, tempLocs[i].long);
  }

  gbLocs = "";

  for(let i = 0; i < tempLocs.length; i++) {
    // Determine the correct icon for the marker
    var totalpts = tempLocs[i].totalpoints;
    var totalreviews = tempLocs[i].totalreviews;
    totalpts = totalpts / totalreviews; // average rating

    var icoType = "goodWater"; // TODO: Change default to 'neutral / grey-water'

    // Calculate the rating based on conditionals
    if(totalpts = 0 || totalpts == 2.5)
      icoType = "goodWater";
    else if(totalpts < 2.5)
      icoType = "badWater";
    else if(totalpts > 2.5)
      icoType = "goodWater";

      console.log("<MarkerF position={{ lat: " + tempLocs[i].lat + ", lng: " +  tempLocs[i].long + "}} icon={" + icoType + "}/>\n");

    // Add the marker to the list
    gbLocs += "<MarkerF position={{ lat: " + tempLocs[i].lat + ", lng: " +  tempLocs[i].long + "}} icon={" + icoType + "}/>\n";
  }
}

fetch();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element ={<Map />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);