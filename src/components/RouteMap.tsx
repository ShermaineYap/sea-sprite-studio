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
  center?: [number, number];
  zoom?: number;
}

export const RouteMap = ({ 
  ports = [], 
  route = [], 
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

    // Add port markers
    ports.forEach((port, index) => {
      const marker = L.marker([port.lat, port.lng], {
        title: port.name,
      }).addTo(mapRef.current!);

      const isStart = index === 0;
      const isEnd = index === ports.length - 1;
      
      marker.bindPopup(`
        <div class="font-semibold">${port.name}</div>
        <div class="text-sm text-muted-foreground">
          ${isStart ? '🟢 Start Port' : isEnd ? '🔴 End Port' : `⚓ Port ${index + 1}`}
        </div>
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
