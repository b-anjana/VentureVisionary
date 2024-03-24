"use client";

import './App.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useState, useEffect } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

let map, infoWindow;

function loadGoogleMapsAPI() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC9xmK-HdVTMZuQk83FkjGTxTfE_79eZvc&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function initMap() {
  map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new window.google.maps.InfoWindow();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation.",
  );
  infoWindow.open(map);
}

window.initMap = initMap;

export default function MapShow() {
  const [open, setOpen] = useState(false);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);


  return (
    <APIProvider apiKey='AIzaSyC9xmK-HdVTMZuQk83FkjGTxTfE_79eZvc'>
      <div style={{ height: "100vh", width: "75vw" }}>
        <div id="map" style={{ height: "100%" }}></div>
        {map && (
          <Map>
            {userPosition && (
              <AdvancedMarker
                position={userPosition}
                onClick={() => setOpen(true)}
              />
            )}
            {open && userPosition && (
              <InfoWindow position={userPosition}>
                <p>I'm in hell</p>
              </InfoWindow>
            )}
          </Map>
        )}
      </div>
    </APIProvider>
  );
}
  

//export default App;