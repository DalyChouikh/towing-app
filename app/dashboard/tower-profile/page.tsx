"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Car, MapPin, Phone, Truck } from "lucide-react"

export default function TowerProfilePage() {
  const [towerProfile, setTowerProfile] = useState({
    companyName: "Fast Tow Services",
    driverName: "John Smith",
    contactNumber: "555-123-4567",
    vehicleDetails: "Flatbed Truck",
    availability: "AVAILABLE",
    serviceArea: "Anytown and surrounding areas",
    serviceDescription:
      "24/7 towing services for all vehicle types. Specializing in emergency roadside assistance and long-distance towing.",
    rates: {
      baseRate: "75",
      perMileRate: "3.50",
      afterHoursRate: "100",
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field, value) => {
    setTowerProfile({
      ...towerProfile,
      [field]: value,
    })
  }

  const handleRateChange = (field, value) => {
    setTowerProfile({
      ...towerProfile,
      rates: {
        ...towerProfile.rates,
        [field]: value,
      },
    })
  }

  const handleSaveProfile = () => {
    // In a real app, this would save the profile to your backend
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your tower profile has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tower Profile</h1>
          <p className="text-muted-foreground">Manage your towing service profile and availability</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="availability"
              checked={towerProfile.availability === "AVAILABLE"}
              onCheckedChange={(checked) => handleInputChange("availability", checked ? "AVAILABLE" : "OFFLINE")}
            />
            <Label htmlFor="availability">{towerProfile.availability === "AVAILABLE" ? "Available" : "Offline"}</Label>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          ) : (
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Company Information
            </CardTitle>
            <CardDescription>Your towing service company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={towerProfile.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverName">Driver Name</Label>
              <Input
                id="driverName"
                value={towerProfile.driverName}
                onChange={(e) => handleInputChange("driverName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={towerProfile.contactNumber}
                onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleDetails">Vehicle Details</Label>
              <Input
                id="vehicleDetails"
                value={towerProfile.vehicleDetails}
                onChange={(e) => handleInputChange("vehicleDetails", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Service Area & Description
            </CardTitle>
            <CardDescription>Details about your service area and offerings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceArea">Service Area</Label>
              <Input
                id="serviceArea"
                value={towerProfile.serviceArea}
                onChange={(e) => handleInputChange("serviceArea", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Service Description</Label>
              <Textarea
                id="serviceDescription"
                value={towerProfile.serviceDescription}
                onChange={(e) => handleInputChange("serviceDescription", e.target.value)}
                disabled={!isEditing}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Rates & Pricing
            </CardTitle>
            <CardDescription>Set your towing service rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="baseRate">Base Rate ($)</Label>
              <Input
                id="baseRate"
                type="number"
                value={towerProfile.rates.baseRate}
                onChange={(e) => handleRateChange("baseRate", e.target.value)}
                disabled={!isEditing}
              />
              <p className="text-xs text-muted-foreground">The starting rate for any tow service</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="perMileRate">Per Mile Rate ($)</Label>
              <Input
                id="perMileRate"
                type="number"
                step="0.01"
                value={towerProfile.rates.perMileRate}
                onChange={(e) => handleRateChange("perMileRate", e.target.value)}
                disabled={!isEditing}
              />
              <p className="text-xs text-muted-foreground">Additional charge per mile traveled</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="afterHoursRate">After Hours Rate ($)</Label>
              <Input
                id="afterHoursRate"
                type="number"
                value={towerProfile.rates.afterHoursRate}
                onChange={(e) => handleRateChange("afterHoursRate", e.target.value)}
                disabled={!isEditing}
              />
              <p className="text-xs text-muted-foreground">Rate for services between 8PM and 6AM</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Supported Vehicle Types
            </CardTitle>
            <CardDescription>Types of vehicles you can tow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="sedan" defaultChecked disabled={!isEditing} />
                <Label htmlFor="sedan">Sedan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="suv" defaultChecked disabled={!isEditing} />
                <Label htmlFor="suv">SUV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="truck" defaultChecked disabled={!isEditing} />
                <Label htmlFor="truck">Pickup Truck</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="van" defaultChecked disabled={!isEditing} />
                <Label htmlFor="van">Van</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="motorcycle" disabled={!isEditing} />
                <Label htmlFor="motorcycle">Motorcycle</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="heavyduty" disabled={!isEditing} />
                <Label htmlFor="heavyduty">Heavy Duty</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              These settings determine which tow requests you'll receive based on vehicle type.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
