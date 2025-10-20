import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Ship } from "lucide-react";
import { renderToString } from "react-dom/server";

interface CurrentLocationMapProps {
  currentLocation: { lat: number; lng: number };
}

const CurrentLocationMap = ({ currentLocation }: CurrentLocationMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [currentLocation.lat, currentLocation.lng],
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    mapRef.current = map;

    // Add ocean-themed tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      className: "map-tiles",
    }).addTo(map);

    // Create custom vessel icon
    const vesselIconHtml = renderToString(
      <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full shadow-lg border-4 border-white animate-pulse">
        <Ship className="w-6 h-6 text-primary-foreground" />
      </div>
    );

    const vesselIcon = L.divIcon({
      html: vesselIconHtml,
      className: "custom-vessel-marker",
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    // Add vessel marker
    L.marker([currentLocation.lat, currentLocation.lng], { icon: vesselIcon })
      .addTo(map)
      .bindPopup(
        `<div class="text-center font-semibold">
          <p class="text-primary">Current Vessel Location</p>
          <p class="text-xs text-muted-foreground mt-1">${currentLocation.lat.toFixed(4)}°N, ${currentLocation.lng.toFixed(4)}°E</p>
        </div>`
      )
      .openPopup();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [currentLocation]);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border-2 border-border">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};

export default CurrentLocationMap;
