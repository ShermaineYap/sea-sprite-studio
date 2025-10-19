import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation } from 'lucide-react';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Port {
  name: string;
  lat: number;
  lng: number;
  country?: string;
}

interface RouteSegment {
  start: Port;
  end: Port;
  path: [number, number][];
  distance: number;
  fuelConsumption: number;
}

interface RouteMapProps {
  ports?: Port[];
  route?: RouteSegment[];
  currentLocation?: Port;
  center?: [number, number];
  zoom?: number;
}

export const RouteMap = ({ 
  ports = [], 
  route = [],
  currentLocation,
  center = [1.3521, 103.8198], // Singapore as default
  zoom = 4 
}: RouteMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: true,
        attributionControl: false,
      });

      // Add ocean-themed tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing layers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // If no route calculated, show current vessel location
    if (route.length === 0 && currentLocation) {
      const vesselIcon = L.divIcon({
        className: 'custom-vessel-marker',
        html: `
          <div style="
            background: #0ea5e9;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
          "></div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([currentLocation.lat, currentLocation.lng], {
        icon: vesselIcon,
        title: currentLocation.name,
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div class="font-semibold">🚢 ${currentLocation.name}</div>
        <div class="text-sm text-muted-foreground">Current vessel position</div>
        <div class="text-xs text-muted-foreground mt-1">
          ${currentLocation.lat.toFixed(4)}°, ${currentLocation.lng.toFixed(4)}°
        </div>
      `);

      mapRef.current.setView([currentLocation.lat, currentLocation.lng], 8);
      return;
    }

    // Add port markers for calculated route
    ports.forEach((port, index) => {
      const isStart = index === 0;
      const isEnd = index === ports.length - 1;
      
      const iconHtml = isStart 
        ? `<div style="background: #22c55e; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`
        : isEnd
        ? `<div style="background: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`
        : `<div style="background: #f97316; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`;

      const customIcon = L.divIcon({
        className: 'custom-port-marker',
        html: iconHtml,
        iconSize: isStart || isEnd ? [20, 20] : [16, 16],
        iconAnchor: isStart || isEnd ? [10, 10] : [8, 8],
      });

      const marker = L.marker([port.lat, port.lng], {
        icon: customIcon,
        title: port.name,
      }).addTo(mapRef.current!);
      
      marker.bindPopup(`
        <div class="font-semibold">${port.name}</div>
        <div class="text-sm text-muted-foreground">
          ${isStart ? '🟢 Start Port' : isEnd ? '🔴 Destination' : `⚓ Waypoint ${index}`}
        </div>
        <div class="text-xs text-muted-foreground mt-1">${port.country}</div>
      `);
    });

    // Add route lines
    route.forEach((segment, index) => {
      const path = segment.path.length > 0 
        ? segment.path 
        : [[segment.start.lat, segment.start.lng], [segment.end.lat, segment.end.lng]];

      const polyline = L.polyline(path as [number, number][], {
        color: index === 0 ? '#0ea5e9' : '#22c55e',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 10',
      }).addTo(mapRef.current!);

      polyline.bindPopup(`
        <div class="space-y-1">
          <div class="font-semibold">${segment.start.name} → ${segment.end.name}</div>
          <div class="text-sm">Distance: ${segment.distance.toFixed(1)} nm</div>
          <div class="text-sm">Fuel: ${segment.fuelConsumption.toFixed(1)} tons</div>
        </div>
      `);
    });

    // Fit bounds if there are ports
    if (ports.length > 0) {
      const bounds = L.latLngBounds(ports.map(p => [p.lat, p.lng] as [number, number]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [ports, route]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden border-2 border-border">
      <div ref={mapContainerRef} className="absolute inset-0" />
      {ports.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
          <div className="text-center">
            <Navigation className="h-12 w-12 mx-auto mb-3 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">
              Configure vessel and calculate route to view map
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
