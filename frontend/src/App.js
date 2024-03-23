"use client";

import './App.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useState } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function App() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey='AIzaSyB9QU0vQ9nhrMgwL8VCCnFh2d0dRm0uLJs'>
      <div style={{height: "100vh", width: "75vw"}}>
        <Map 
          zoom={9}  
          center={position} 
          mapId = {"348ffe81b5913ac0"}
        > 
          <AdvancedMarker 
            position={position}
            onClick={() => setOpen(true)}>
          </AdvancedMarker>
          {open && <InfoWindow position={position}><p>I'm in hell</p></InfoWindow>}
        </Map>
      </div>
    </APIProvider>

  );
}

//export default App;