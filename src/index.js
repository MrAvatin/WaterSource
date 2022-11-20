import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Map from './pages/Map';
import About from './pages/About';
import firebase from "firebase/app"
import { useEffect } from 'react';
import "firebase/firestore"

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

export { db };

const fetch = async () => {
  const req = await db.collection('waterstore').get();
  const tempLocs = req.docs.map((doc)=>({...doc.data(), id: doc.id}));
  console.log(tempLocs);

  for(let i = 0; i < tempLocs.length; i++){
    console.log('Location:', tempLocs[i].lat, tempLocs[i].long);
  }
}

fetch();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element ={<Map />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);