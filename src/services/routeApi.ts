import { RouteRequest, RouteResponse, Port } from '@/types/route';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const routeApi = {
  /**
   * Calculate optimized route based on vessel config and selected ports
   */
  async calculateRoute(request: RouteRequest): Promise<RouteResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/calculate-route`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vessel: {
            speed_knots: request.vessel.speed,
            fuel_consumption_t_per_day: request.vessel.fuelConsumption,
            fuel_tank_capacity_t: request.vessel.tankCapacity,
            safety_fuel_margin_t: request.vessel.safetyMargin,
            fuel_tank_remaining_t: request.vessel.tankCapacity,
            size: [request.vessel.length, request.vessel.width, request.vessel.height],
            percent_of_height_underwater: request.vessel.underwaterPercent / 100,
          },
          ports: request.ports.map(p => ({
            name: p.name,
            lat: p.lat,
            lng: p.lng,
          })),
          optimization_mode: request.optimizationMode || 'balanced',
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        route: data,
      };
    } catch (error) {
      console.error('Route calculation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  },

  /**
   * Get available ports from the database
   */
  async getPorts(region?: string): Promise<Port[]> {
    try {
      const url = region 
        ? `${API_BASE_URL}/api/ports?region=${region}`
        : `${API_BASE_URL}/api/ports`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch ports');
      }

      const data = await response.json();
      return data.ports || [];
    } catch (error) {
      console.error('Failed to fetch ports:', error);
      // Return mock data for development
      return mockPorts;
    }
  },

  /**
   * Search ports by name
   */
  async searchPorts(query: string): Promise<Port[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/ports/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      return data.ports || [];
    } catch (error) {
      console.error('Port search failed:', error);
      return mockPorts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  },
};

// Mock data for development/fallback
const mockPorts: Port[] = [
  { id: '1', name: 'Port of Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore' },
  { id: '2', name: 'Port of Shanghai', lat: 31.2304, lng: 121.4737, country: 'China' },
  { id: '3', name: 'Port of Rotterdam', lat: 51.9244, lng: 4.4777, country: 'Netherlands' },
  { id: '4', name: 'Port of Hong Kong', lat: 22.3193, lng: 114.1694, country: 'Hong Kong' },
  { id: '5', name: 'Port of Busan', lat: 35.1796, lng: 129.0756, country: 'South Korea' },
  { id: '6', name: 'Port of Los Angeles', lat: 33.7405, lng: -118.2720, country: 'USA' },
  { id: '7', name: 'Port of Dubai', lat: 25.2769, lng: 55.3257, country: 'UAE' },
  { id: '8', name: 'Port of Tokyo', lat: 35.6528, lng: 139.7594, country: 'Japan' },
];
