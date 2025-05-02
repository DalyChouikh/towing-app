"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Car, Building, ArrowRight, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

type Location = {
  latitude: number;
  longitude: number;
  addressString: string;
};

// Mock data for cars
const userCars = [
  {
    id: "car-1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    licensePlate: "ABC-1234",
  },
  {
    id: "car-2",
    make: "Honda",
    model: "Civic",
    year: 2019,
    licensePlate: "XYZ-5678",
  },
];

// Mock data for destinations
const destinations = [
  {
    id: "dest-1",
    type: "RepairShop",
    name: "Quick Fix Auto Repair",
    address: "123 Main St, Anytown",
  },
  {
    id: "dest-2",
    type: "CarAgency",
    name: "Toyota Dealership",
    address: "456 Oak Ave, Anytown",
  },
  {
    id: "dest-3",
    type: "AssuranceCompany",
    name: "Safe Drive Insurance",
    address: "789 Pine Blvd, Anytown",
  },
];

// Helper component to handle map clicks and marker
function LocationPicker({ pickupLocation, setPickupLocation }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPickupLocation((prev) => ({
        latitude: lat,
        longitude: lng,
        addressString: prev?.addressString || "",
      }));
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return pickupLocation?.latitude !== undefined &&
    pickupLocation?.longitude !== undefined ? (
    <Marker
      position={[pickupLocation.latitude, pickupLocation.longitude]}
    ></Marker>
  ) : null;
}



export default function RequestTowPage() {
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinationType, setDestinationType] = useState("RepairShop");
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: iconRetinaUrl.src,
      iconUrl: iconUrl.src,
      shadowUrl: shadowUrl.src,
    });
  }, []);

  const handleSubmit = () => {
    toast({
      title: "Tow request submitted",
      description:
        "Your tow request has been submitted successfully. A tower will be assigned shortly.",
    });

    setSelectedCar("");
    setSelectedDestination("");
    setPickupLocation(null);
    setNotes("");
    setStep(1);
  };

  const defaultCenter: [number, number] = [40.7128, -74.006];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Request a Tow</h1>
        <p className="text-muted-foreground">
          Fill out the form below to request a towing service
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 1 ? "bg-primary text-primary-foreground" : "border"
            }`}
          >
            1
          </div>
          <div
            className={`h-0.5 w-12 ${step >= 2 ? "bg-primary" : "bg-border"}`}
          />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 2 ? "bg-primary text-primary-foreground" : "border"
            }`}
          >
            2
          </div>
          <div
            className={`h-0.5 w-12 ${step >= 3 ? "bg-primary" : "bg-border"}`}
          />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              step >= 3 ? "bg-primary text-primary-foreground" : "border"
            }`}
          >
            3
          </div>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Select Your Vehicle
            </CardTitle>
            <CardDescription>
              Choose the car that needs to be towed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedCar} onValueChange={setSelectedCar}>
              {userCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center space-x-2 rounded-md border p-4"
                >
                  <RadioGroupItem value={car.id} id={car.id} />
                  <Label
                    htmlFor={car.id}
                    className="flex flex-1 cursor-pointer items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {car.make} {car.model} ({car.year})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        License Plate: {car.licensePlate}
                      </p>
                    </div>
                    <Car className="h-5 w-5 text-muted-foreground" />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" disabled>
              Back
            </Button>
            <Button onClick={() => setStep(2)} disabled={!selectedCar}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Pickup Location
            </CardTitle>
            <CardDescription>
              Enter address or click on the map to set pickup location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address or click map"
                  value={pickupLocation?.addressString || ""}
                  onChange={(e) =>
                    setPickupLocation((prev) => ({
                      latitude: prev?.latitude ?? 0,
                      longitude: prev?.longitude ?? 0,
                      addressString: e.target.value,
                    }))
                  }
                />
                {pickupLocation?.latitude !== undefined &&
                  pickupLocation?.longitude !== undefined && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Coordinates: Lat: {pickupLocation.latitude.toFixed(4)},
                      Lon: {pickupLocation.longitude.toFixed(4)}
                    </p>
                  )}
              </div>

              <div className="h-[400px] w-full rounded-md border overflow-hidden">
                <MapContainer
                  center={
                    pickupLocation?.latitude && pickupLocation?.longitude
                      ? [pickupLocation.latitude, pickupLocation.longitude]
                      : defaultCenter
                  }
                  zoom={13}
                  scrollWheelZoom={true}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationPicker
                    pickupLocation={pickupLocation}
                    setPickupLocation={setPickupLocation}
                  />
                </MapContainer>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">
                  Additional Location Details (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="E.g., parking lot, building entrance, landmarks, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={
                !pickupLocation?.addressString ||
                pickupLocation?.latitude === undefined ||
                pickupLocation?.longitude === undefined
              }
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Select Destination
            </CardTitle>
            <CardDescription>
              Choose where you want your vehicle to be towed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Tabs value={destinationType} onValueChange={setDestinationType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="RepairShop">Repair Shop</TabsTrigger>
                  <TabsTrigger value="CarAgency">Car Agency</TabsTrigger>
                  <TabsTrigger value="AssuranceCompany">Insurance</TabsTrigger>
                </TabsList>
                <TabsContent value="RepairShop" className="space-y-4">
                  <RadioGroup
                    value={selectedDestination}
                    onValueChange={setSelectedDestination}
                  >
                    {destinations
                      .filter((dest) => dest.type === "RepairShop")
                      .map((dest) => (
                        <div
                          key={dest.id}
                          className="flex items-center space-x-2 rounded-md border p-4"
                        >
                          <RadioGroupItem value={dest.id} id={dest.id} />
                          <Label
                            htmlFor={dest.id}
                            className="flex flex-1 cursor-pointer"
                          >
                            <div>
                              <p className="font-medium">{dest.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {dest.address}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Repair Shop
                  </Button>
                </TabsContent>
                <TabsContent value="CarAgency" className="space-y-4">
                  <RadioGroup
                    value={selectedDestination}
                    onValueChange={setSelectedDestination}
                  >
                    {destinations
                      .filter((dest) => dest.type === "CarAgency")
                      .map((dest) => (
                        <div
                          key={dest.id}
                          className="flex items-center space-x-2 rounded-md border p-4"
                        >
                          <RadioGroupItem value={dest.id} id={dest.id} />
                          <Label
                            htmlFor={dest.id}
                            className="flex flex-1 cursor-pointer"
                          >
                            <div>
                              <p className="font-medium">{dest.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {dest.address}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Car Agency
                  </Button>
                </TabsContent>
                <TabsContent value="AssuranceCompany" className="space-y-4">
                  <RadioGroup
                    value={selectedDestination}
                    onValueChange={setSelectedDestination}
                  >
                    {destinations
                      .filter((dest) => dest.type === "AssuranceCompany")
                      .map((dest) => (
                        <div
                          key={dest.id}
                          className="flex items-center space-x-2 rounded-md border p-4"
                        >
                          <RadioGroupItem value={dest.id} id={dest.id} />
                          <Label
                            htmlFor={dest.id}
                            className="flex flex-1 cursor-pointer"
                          >
                            <div>
                              <p className="font-medium">{dest.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {dest.address}
                              </p>
                            </div>
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Insurance Company
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedDestination}>
              Submit Request
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
