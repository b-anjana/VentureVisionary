"use client";

import './App.css';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

let map, geocoder, infoWindow;

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
  geocoder = new window.google.maps.Geocoder();
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
    axios.get("/radius-search")
    .then(response => {
      for (let count = 0; count < response.data.results.length; count++) {
        const location = response.data.results[count];
        const marker = new window.google.maps.Marker({
            map,
            position: { lat: location.geometry.location.lat, lng: location.geometry.location.lng },
          });
        window.google.maps.event.addListener(marker, 'click', () => {
          infoWindow.setContent(location.name);
          infoWindow.open(map, marker);
        });
      }
    })
    .catch(error => {
      console.error("Error fetching locations:", error);
    });

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
  const [city, setCity] = useState('');
  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      initMap();
    });
  }, []);

  const handleLocationSet = (address) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        new window.google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLocationSet(city);
  };


  return (
    <div className='flex flex-col h-screen'>
    <form onSubmit={handleSubmit} className='mb-4'>
      <input
        type="text"
        placeholder="Enter a city"
        className='border p-2 rounded-lg'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className='ml-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Set Location
      </button>
    </form>
    {/* {city.toLowerCase() === 'dallas' ? (
        <button type="submit" className='ml-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Set Location
        </button>
      ) : city.toLowerCase() === 'chicago' ? (
        <button type="submit" className='ml-2 mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
          Set Location
        </button>
      ) : (
        <button type="submit" className='ml-2 mt-4 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
          Hi
        </button>
      )} */}
    <div className='flex-grow' id="map" style={{ width: "75vw" }}>
    </div>
  </div>
  );
 
}
  