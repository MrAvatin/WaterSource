import './App.css';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import * as React from 'react';
import * as Popper from "@popperjs/core"


export default function App() {



  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return (<div>Loading...</div>);

  return (
    <div className="App">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"/>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
      <AboutPage/>
    </div>
  );
}

function HomeScreen() {
  return (
    <div>
      <nav class="navbar justify-content-center">
      <div>
        Water
        <svg width="25" height="35" viewBox="0 0 25 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.4088 0.833313L11.0024 2.22161C10.5474 2.67076 0 13.2055 0 22.1477C0 28.8851 5.58394 34.3974 12.4088 34.3974C19.2336 34.3974 24.8175 28.8851 24.8175 22.1477C24.8175 13.2463 14.2701 2.67076 13.8151 2.22161L12.4088 0.833313V0.833313ZM6.20438 20.1061C7.36253 20.1061 8.27251 21.0044 8.27251 22.1477C8.27251 24.3935 10.1338 26.231 12.4088 26.231C13.5669 26.231 14.4769 27.1293 14.4769 28.2726C14.4769 29.4159 13.5669 30.3142 12.4088 30.3142C7.85888 30.3142 4.13625 26.6393 4.13625 22.1477C4.13625 21.0044 5.04623 20.1061 6.20438 20.1061Z" fill="#25B3E0"/>
        </svg>
        Source
      </div>
    </nav>
    </div>
  );
}

function Map() {
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

function AboutPage() {
  return (
    <div>
      <nav class="navbar justify-content-center">
        <div>
          Water
          <svg width="25" height="35" viewBox="0 0 25 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.4088 0.833313L11.0024 2.22161C10.5474 2.67076 0 13.2055 0 22.1477C0 28.8851 5.58394 34.3974 12.4088 34.3974C19.2336 34.3974 24.8175 28.8851 24.8175 22.1477C24.8175 13.2463 14.2701 2.67076 13.8151 2.22161L12.4088 0.833313V0.833313ZM6.20438 20.1061C7.36253 20.1061 8.27251 21.0044 8.27251 22.1477C8.27251 24.3935 10.1338 26.231 12.4088 26.231C13.5669 26.231 14.4769 27.1293 14.4769 28.2726C14.4769 29.4159 13.5669 30.3142 12.4088 30.3142C7.85888 30.3142 4.13625 26.6393 4.13625 22.1477C4.13625 21.0044 5.04623 20.1061 6.20438 20.1061Z" fill="#25B3E0"/>
          </svg>
          Source
        </div>
      </nav>
      <h1>About</h1>
      <p>Water Source is a web application that allows users to identify the nearest clean water source to them. The application is built using React and Google Maps API.</p>
      {/* Made by the following developers */}
      {/* Add space here */}
      <h2>Developers</h2>

      <div class="card-group" >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Christopher Chan</h5>
            <p class="card-text">A student at the University of Calgary studying Software Engineering</p>
            <a href="https://github.com/cjchanx" class="btn btn-primary">GitHub</a>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Neeraj Sunil Kumar</h5>
            <p class="card-text">A student at the University of Calgary studying Software Engineering</p>
            <a href="https://github.com/MrAvatin" class="btn btn-primary">GitHub</a>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Rakshit Patel</h5>
            <p class="card-text">A student at the University of Toronto studying Computer Science</p>
            <a href="https://github.com/RakshitP1" class="btn btn-primary">GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}
