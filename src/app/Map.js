"use client";
import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    let map, infoWindow;

    function initMap() {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.47474991108645, lng: -80.54232500673547 },
        zoom: 6,
      });
      infoWindow = new window.google.maps.InfoWindow();

      const locationButton = document.createElement("button");
      locationButton.textContent = "Pan to Current Location";
      locationButton.classList.add("custom-map-control-button");
      locationButton.style.background = "#fff";
      locationButton.style.color = "#000";
      locationButton.style.padding = "8px 16px";
      locationButton.style.fontSize = "16px";
      locationButton.style.borderRadius = "1px";
      locationButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      locationButton.style.margin = "12px";
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              map.setCenter(pos);
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter());
            },
          );
        } else {
          handleLocationError(false, infoWindow, map.getCenter());
        }
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

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;
  document.body.appendChild(script);
    return () => {
      delete window.initMap;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{
        width: "70vw",
        height: "60vh",
        maxWidth: "800px",
        maxHeight: "600px",
      }}
    ></div>
  );
}