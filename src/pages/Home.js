import { render } from '@testing-library/react';
import * as React from 'react';
import {Link } from "react-router-dom"



export default function Home() {
  const customstyle = {
    backgroundImage: "img('../img/sand.jpg')",
  }

  return (
    <div className="App">
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

      <div class="container">
        Clean water in the Palm of Your Hands
      </div>
      <Link to="/map">
        <button type="button" class="btn btn-primary">Go!</button>
      </Link>
      
  
      </div>
      
    </div>
  );
}