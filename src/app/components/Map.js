"use client";
import { useEffect, useRef, useState } from "react";
import chargers from "../chargers";

export default function Map() {
  const mapRef = useRef(null);
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    let map, infoWindow;
    let markers = [];

    function initMap() {
      map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.47474991108645, lng: -80.54232500673547 },
        zoom: 12,
      });
      infoWindow = new window.google.maps.InfoWindow();

      markers = chargers
        .filter((charger) => !showAvailable || charger.available)
        .map((charger) => {
          const marker = new window.google.maps.Marker({
            position: { lat: charger.lat, lng: charger.lng },
            map,
            title: charger.name,
            icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
          });
          marker.addListener("click", () => {
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${charger.lat},${charger.lng}`;
            const checkInUrl = `/CheckIn?id=${charger.id}`;
            infoWindow.setContent(
              `<div style='font-size:15px; color:black; width:200px;'><strong>${charger.name}</strong><br />`
              + `Available: ${charger.available ? "Yes" : "No"}<br />`
              + `Rate: $${charger.rate}/kWh<br />`
              + `<a href='${directionsUrl}' target='_blank' style='color:#4285F4;text-decoration:none;display:inline-block;margin-top:8px;' onmouseover='this.style.textDecoration="underline"' onmouseout='this.style.textDecoration="none"'>View on Google Maps</a><br />`
              + (charger.available
                  ? `<a href='${checkInUrl}' style='display:inline-block;margin-top:8px;padding:8px 16px;background:#6b7280;color:#fff;border-radius:6px;text-align:center;text-decoration:none;font-weight:600;'>Check In</a>`
                  : `<span style='display:inline-block;margin-top:8px;padding:8px 16px;background:#d1d5db;color:#888;border-radius:6px;text-align:center;font-weight:600;cursor:not-allowed;'>Check In</span>`)
              + `</div>`
            );
            infoWindow.open(map, marker);
          });
          return marker;
        });

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
      if (markers && markers.length) {
        markers.forEach((marker) => marker.setMap(null));
      }
    };
  }, [showAvailable]);

  return (
    <div style={{ width: "100%" }}>
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
            <button
              onClick={() => setShowAvailable((v) => !v)}
              style={{
                background: showAvailable ? "#d1d5db" : "#fff",
                color: "#000",
                padding: "8px 16px",
                fontSize: "16px",
                borderRadius: "1px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                margin: "12px 0",
                border: showAvailable ? "2px solid #8a919dff" : "none",
                fontWeight: 600,
              }}
            >
              Available
            </button>
      </div>
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
    </div>
  );
}