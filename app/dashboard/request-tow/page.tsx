"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Car, Building, ArrowRight, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
]

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
]

export default function RequestTowPage() {
  const [selectedCar, setSelectedCar] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("")
  const [destinationType, setDestinationType] = useState("RepairShop")
  const [pickupLocation, setPickupLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [step, setStep] = useState(1)
  const [mapLoaded, setMapLoaded] = useState(false)
  const { toast } = useToast()

  // In a real app, this would load an actual map library like Google Maps or Mapbox
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = () => {
    // In a real app, this would submit the tow request to your backend
    toast({
      title: "Tow request submitted",
      description: "Your tow request has been submitted successfully. A tower will be assigned shortly.",
    })

    // Reset form and go back to step 1
    setSelectedCar("")
    setSelectedDestination("")
    setPickupLocation("")
    setNotes("")
    setStep(1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Request a Tow</h1>
        <p className="text-muted-foreground">Fill out the form below to request a towing service</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border"}`}
          >
            1
          </div>
          <div className={`h-0.5 w-12 ${step >= 2 ? "bg-primary" : "bg-border"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border"}`}
          >
            2
          </div>
          <div className={`h-0.5 w-12 ${step >= 3 ? "bg-primary" : "bg-border"}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border"}`}
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
            <CardDescription>Choose the car that needs to be towed</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedCar} onValueChange={setSelectedCar}>
              {userCars.map((car) => (
                <div key={car.id} className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value={car.id} id={car.id} />
                  <Label htmlFor={car.id} className="flex flex-1 cursor-pointer items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {car.make} {car.model} ({car.year})
                      </p>
                      <p className="text-sm text-muted-foreground">License Plate: {car.licensePlate}</p>
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
            <CardDescription>Select your current location for pickup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your current address"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </div>

              <div className="rounded-md border">
                <div className="h-[300px] w-full bg-muted relative">
                  {!mapLoaded ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <MapPin className="h-8 w-8 text-primary" />
                      <p className="mt-2 font-medium">Map View</p>
                      <p className="text-sm text-muted-foreground">
                        In a real application, this would be an interactive map where you can select your location
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Location Details (Optional)</Label>
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
            <Button onClick={() => setStep(3)} disabled={!pickupLocation}>
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
            <CardDescription>Choose where you want your vehicle to be towed</CardDescription>
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
                  <RadioGroup value={selectedDestination} onValueChange={setSelectedDestination}>
                    {destinations
                      .filter((dest) => dest.type === "RepairShop")
                      .map((dest) => (
                        <div key={dest.id} className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value={dest.id} id={dest.id} />
                          <Label htmlFor={dest.id} className="flex flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">{dest.name}</p>
                              <p className="text-sm text-muted-foreground">{dest.address}</p>
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
                  <RadioGroup value={selectedDestination} onValueChange={setSelectedDestination}>
                    {destinations
                      .filter((dest) => dest.type === "CarAgency")
                      .map((dest) => (
                        <div key={dest.id} className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value={dest.id} id={dest.id} />
                          <Label htmlFor={dest.id} className="flex flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">{dest.name}</p>
                              <p className="text-sm text-muted-foreground">{dest.address}</p>
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
                  <RadioGroup value={selectedDestination} onValueChange={setSelectedDestination}>
                    {destinations
                      .filter((dest) => dest.type === "AssuranceCompany")
                      .map((dest) => (
                        <div key={dest.id} className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value={dest.id} id={dest.id} />
                          <Label htmlFor={dest.id} className="flex flex-1 cursor-pointer">
                            <div>
                              <p className="font-medium">{dest.name}</p>
                              <p className="text-sm text-muted-foreground">{dest.address}</p>
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
  )
}
