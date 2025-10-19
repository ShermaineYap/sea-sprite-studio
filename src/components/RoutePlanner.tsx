import { useState } from "react";
import { Ship, Navigation, TrendingDown, Clock, Anchor, Waves, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RouteMap } from "./RouteMap";
import { PortSelector } from "./PortSelector";
import { Port, OptimizedRoute } from "@/types/route";
import { routeApi } from "@/services/routeApi";
import { useToast } from "@/hooks/use-toast";

export const RoutePlanner = () => {
  const { toast } = useToast();
  const [vesselConfig, setVesselConfig] = useState({
    speed: 20.0,
    fuelConsumption: 20.0,
    tankCapacity: 1000.0,
    safetyMargin: 10.0,
    length: 1000,
    width: 500,
    height: 60,
    underwaterPercent: 30,
  });

  const [selectedPorts, setSelectedPorts] = useState<Port[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculateRoute = async () => {
    if (selectedPorts.length < 2) {
      toast({
        title: "Insufficient Ports",
        description: "Please select at least 2 ports (start and end).",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);
    
    try {
      const response = await routeApi.calculateRoute({
        vessel: vesselConfig,
        ports: selectedPorts,
        optimizationMode: 'balanced',
      });

      if (response.success && response.route) {
        setOptimizedRoute(response.route);
        toast({
          title: "Route Calculated",
          description: `Optimized route with ${response.route.segments.length} segments generated successfully.`,
        });
      } else {
        toast({
          title: "Calculation Failed",
          description: response.error || "Unable to calculate route. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Using demo mode.",
        variant: "destructive",
      });
      // Fallback to demo data
      generateDemoRoute();
    } finally {
      setIsCalculating(false);
    }
  };

  const generateDemoRoute = () => {
    if (selectedPorts.length < 2) return;

    const segments = selectedPorts.slice(0, -1).map((port, index) => {
      const nextPort = selectedPorts[index + 1];
      const distance = calculateDistance(port, nextPort);
      const fuelConsumption = (distance / (vesselConfig.speed * 24)) * vesselConfig.fuelConsumption;
      const travelTime = distance / vesselConfig.speed;

      return {
        start: port,
        end: nextPort,
        path: [[port.lat, port.lng] as [number, number], [nextPort.lat, nextPort.lng] as [number, number]],
        distance,
        fuelConsumption,
        travelTime,
      };
    });

    const totalDistance = segments.reduce((sum, seg) => sum + seg.distance, 0);
    const totalFuel = segments.reduce((sum, seg) => sum + seg.fuelConsumption, 0);
    const totalTime = segments.reduce((sum, seg) => sum + seg.travelTime, 0);

    setOptimizedRoute({
      segments,
      totalDistance,
      totalFuel,
      totalTime,
      ports: selectedPorts,
      warnings: totalFuel > vesselConfig.tankCapacity - vesselConfig.safetyMargin 
        ? ['⚠️ Fuel capacity may be insufficient for this route']
        : [],
    });
  };

  const calculateDistance = (port1: Port, port2: Port): number => {
    const R = 3440.065; // Earth radius in nautical miles
    const dLat = toRad(port2.lat - port1.lat);
    const dLon = toRad(port2.lng - port1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(port1.lat)) * Math.cos(toRad(port2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (deg: number) => deg * (Math.PI / 180);

  return (
    <section id="planner" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-4">
            <Navigation className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Route Planning
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your Optimal Route
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Configure your vessel parameters and generate optimized maritime routes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vessel Configuration Panel */}
          <Card className="lg:col-span-1 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ship className="h-5 w-5 text-primary" />
                Vessel Configuration
              </CardTitle>
              <CardDescription>Set your vessel specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="speed">Speed (knots)</Label>
                <Input
                  id="speed"
                  type="number"
                  value={vesselConfig.speed}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, speed: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Consumption (tons/day)</Label>
                <Input
                  id="fuel"
                  type="number"
                  value={vesselConfig.fuelConsumption}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, fuelConsumption: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Tank Capacity (tons)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={vesselConfig.tankCapacity}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, tankCapacity: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="margin">Safety Margin (tons)</Label>
                <Input
                  id="margin"
                  type="number"
                  value={vesselConfig.safetyMargin}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, safetyMargin: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={vesselConfig.length}
                    onChange={(e) => setVesselConfig({ ...vesselConfig, length: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (m)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={vesselConfig.width}
                    onChange={(e) => setVesselConfig({ ...vesselConfig, width: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (m)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={vesselConfig.height}
                    onChange={(e) => setVesselConfig({ ...vesselConfig, height: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="underwater">Underwater (%)</Label>
                <Input
                  id="underwater"
                  type="number"
                  value={vesselConfig.underwaterPercent}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, underwaterPercent: parseFloat(e.target.value) || 0 })}
                />
              </div>

              <PortSelector 
                selectedPorts={selectedPorts}
                onPortsChange={setSelectedPorts}
              />

              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleCalculateRoute}
                disabled={isCalculating || selectedPorts.length < 2}
              >
                {isCalculating ? "Calculating..." : "Calculate Route"}
              </Button>
              
              {optimizedRoute && optimizedRoute.warnings.length > 0 && (
                <div className="space-y-2">
                  {optimizedRoute.warnings.map((warning, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{warning}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Route Visualization & Results */}
          <Card className="lg:col-span-2 border-2">
            <CardHeader>
              <CardTitle>Route Optimization Results</CardTitle>
              <CardDescription>View your optimized route and analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="map" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="map">Map View</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="ports">Ports</TabsTrigger>
                </TabsList>

                <TabsContent value="map" className="space-y-4 mt-6">
                  <RouteMap
                    ports={optimizedRoute?.ports || []}
                    route={optimizedRoute?.segments || []}
                  />
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4 mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <TrendingDown className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Fuel Usage</p>
                            <p className="text-2xl font-bold">
                              {optimizedRoute ? `${optimizedRoute.totalFuel.toFixed(1)} tons` : '-- tons'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-accent/10">
                            <Clock className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Travel Time</p>
                            <p className="text-2xl font-bold">
                              {optimizedRoute ? `${optimizedRoute.totalTime.toFixed(1)} hours` : '-- hours'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-secondary/50">
                            <Navigation className="h-5 w-5 text-secondary-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Distance</p>
                            <p className="text-2xl font-bold">
                              {optimizedRoute ? `${optimizedRoute.totalDistance.toFixed(1)} nm` : '-- nm'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-lg bg-muted">
                            <Anchor className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Ports</p>
                            <p className="text-2xl font-bold">
                              {optimizedRoute ? optimizedRoute.ports.length : '--'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {optimizedRoute && (
                    <div className="mt-6 p-4 rounded-lg border bg-card/30 space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                        <h4 className="font-semibold">Route Summary</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Segments:</span>{' '}
                          <span className="font-medium">{optimizedRoute.segments.length}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Avg Speed:</span>{' '}
                          <span className="font-medium">{vesselConfig.speed} knots</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fuel Remaining:</span>{' '}
                          <span className="font-medium">
                            {(vesselConfig.tankCapacity - optimizedRoute.totalFuel).toFixed(1)} tons
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Safety Margin:</span>{' '}
                          <span className={`font-medium ${
                            (vesselConfig.tankCapacity - optimizedRoute.totalFuel) > vesselConfig.safetyMargin
                              ? 'text-accent'
                              : 'text-destructive'
                          }`}>
                            {((vesselConfig.tankCapacity - optimizedRoute.totalFuel) > vesselConfig.safetyMargin ? '✓' : '✗')} 
                            {' '}{vesselConfig.safetyMargin} tons
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="ports" className="space-y-4 mt-6">
                  {optimizedRoute && optimizedRoute.segments.length > 0 ? (
                    <div className="space-y-3">
                      {optimizedRoute.segments.map((segment, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                                Leg {index + 1}
                              </Badge>
                              <div>
                                <p className="font-semibold text-sm">
                                  {segment.start.name} → {segment.end.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {segment.start.country} to {segment.end.country}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Navigation className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Distance</p>
                                <p className="font-medium">{segment.distance.toFixed(1)} nm</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingDown className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Fuel</p>
                                <p className="font-medium">{segment.fuelConsumption.toFixed(1)} tons</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-xs text-muted-foreground">Time</p>
                                <p className="font-medium">{segment.travelTime.toFixed(1)} hrs</p>
                              </div>
                            </div>
                          </div>
                          {segment.weatherConditions && (
                            <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-muted-foreground">
                              <Waves className="h-3 w-3" />
                              <span>Wave: {segment.weatherConditions.waveHeight}m</span>
                              <span>•</span>
                              <span>Wind: {segment.weatherConditions.windSpeed} knots</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Anchor className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">
                        Calculate route to view port-to-port details
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
