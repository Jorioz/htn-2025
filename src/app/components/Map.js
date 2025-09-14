"use client";
import { useEffect, useRef } from "react";

export default function Map({ chargers, showAvailable }) {

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const infoWindowRef = useRef(null);
    const markersRef = useRef([]);

    // Load Google Maps script only once
    useEffect(() => {
        if (window.google && window.google.maps) {
            initMap();
            return;
        }
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.onload = initMap;
        document.body.appendChild(script);

        return () => {
            if (script) document.body.removeChild(script);
        };
        // eslint-disable-next-line
    }, []);

    // Initialize map only once
    function initMap() {
        if (mapInstance.current) return;
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
            center: { lat: 43.47474991108645, lng: -80.54232500673547 },
            zoom: 12,
        });
        infoWindowRef.current = new window.google.maps.InfoWindow();

        // Add location button
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
        mapInstance.current.controls[
            window.google.maps.ControlPosition.TOP_CENTER
        ].push(locationButton);
        locationButton.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        mapInstance.current.setCenter(pos);
                    },
                    () => {
                        handleLocationError(
                            true,
                            infoWindowRef.current,
                            mapInstance.current.getCenter()
                        );
                    }
                );
            } else {
                handleLocationError(
                    false,
                    infoWindowRef.current,
                    mapInstance.current.getCenter()
                );
            }
        });

        updateMarkers();
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        infoWindow.open(mapInstance.current);
    }

    // Update markers when showAvailable changes
    useEffect(() => {
        if (!window.google || !mapInstance.current) return;
        updateMarkers();
        // eslint-disable-next-line
    }, [showAvailable]);

    function updateMarkers() {
        // Remove old markers
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        const filteredChargers = chargers.filter(
            (charger) => !showAvailable || charger.available
        );

        markersRef.current = filteredChargers.map((charger) => {
            const marker = new window.google.maps.Marker({
                position: { lat: charger.lat, lng: charger.lng },
                map: mapInstance.current,
                title: charger.name,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                },
            });
            marker.addListener("click", () => {
                const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${charger.lat},${charger.lng}`;
                const viewChargerURL = `/charger`;
                infoWindowRef.current.setContent(
                    `<div style='font-size:15px; color:black; width:200px;'><strong>${charger.name}</strong><br />` +
                        `Available: ${charger.available ? "Yes" : "No"}<br />` +
                        `Rate: $${charger.rate}/kWh<br />` +
                        `<a href='${directionsUrl}' target='_blank' style='color:#4285F4;text-decoration:none;display:inline-block;margin-top:8px;' onmouseover='this.style.textDecoration="underline"' onmouseout='this.style.textDecoration="none"'>View on Google Maps</a><br />` +
                        (charger.available
                            ? `<a href='${viewChargerURL}' style='display:inline-block;margin-top:8px;padding:8px 16px;background:#6b7280;color:#fff;border-radius:6px;text-align:center;text-decoration:none;font-weight:600;'>View Charger</a>`
                            : `<span style='display:inline-block;margin-top:8px;padding:8px 16px;background:#d1d5db;color:#888;border-radius:6px;text-align:center;font-weight:600;cursor:not-allowed;'>View Charger</span>`) +
                        `</div>`
                );
                infoWindowRef.current.open(mapInstance.current, marker);
            });
            return marker;
        });
    }

    return (
        <div style={{ width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            ></div>
            <div
                ref={mapRef}
                id="map"
                style={{
                    width: "100%",
                    height: "80vh",
                    maxWidth: "2000px",
                    maxHeight: "1000px",
                }}
            ></div>
        </div>
    );
}
