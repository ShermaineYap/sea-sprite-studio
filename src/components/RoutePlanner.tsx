import { useState } from "react";
import { Ship, Navigation, TrendingDown, Clock, Anchor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const RoutePlanner = () => {
  const [vesselConfig, setVesselConfig] = useState({
    speed: "20.0",
    fuelConsumption: "20.0",
    tankCapacity: "1000.0",
    safetyMargin: "10.0",
    length: "1000",
    width: "500",
    height: "60",
    underwaterPercent: "30",
  });

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
                  onChange={(e) => setVesselConfig({ ...vesselConfig, speed: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuel">Fuel Consumption (tons/day)</Label>
                <Input
                  id="fuel"
                  type="number"
                  value={vesselConfig.fuelConsumption}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, fuelConsumption: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Tank Capacity (tons)</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={vesselConfig.tankCapacity}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, tankCapacity: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="margin">Safety Margin (tons)</Label>
                <Input
                  id="margin"
                  type="number"
                  value={vesselConfig.safetyMargin}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, safetyMargin: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (m)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={vesselConfig.length}
                    onChange={(e) => setVesselConfig({ ...vesselConfig, length: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width (m)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={vesselConfig.width}
                    onChange={(e) => setVesselConfig({ ...vesselConfig, width: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (m)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={vesselConfig.height}
                    onChange={(e) => setVesselConfig({ ...vesselConfig, height: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="underwater">Underwater (%)</Label>
                <Input
                  id="underwater"
                  type="number"
                  value={vesselConfig.underwaterPercent}
                  onChange={(e) => setVesselConfig({ ...vesselConfig, underwaterPercent: e.target.value })}
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                Calculate Route
              </Button>
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
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <Navigation className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Configure vessel and calculate route to view map
                      </p>
                    </div>
                  </div>
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
                            <p className="text-2xl font-bold">-- tons</p>
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
                            <p className="text-2xl font-bold">-- hours</p>
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
                            <p className="text-2xl font-bold">-- nm</p>
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
                            <p className="text-2xl font-bold">--</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="ports" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Start
                        </Badge>
                        <span className="font-medium">Port Selection Required</span>
                      </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground py-8">
                      Select ports to display route information
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
