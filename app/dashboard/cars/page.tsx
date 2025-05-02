"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Car, Edit, Plus, Trash } from "lucide-react"

// Mock data for cars
const initialCars = [
  {
    id: "car-1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    vin: "1HGCM82633A123456",
    licensePlate: "ABC-1234",
    color: "Silver",
  },
  {
    id: "car-2",
    make: "Honda",
    model: "Civic",
    year: 2019,
    vin: "2HGFC2F52KH123456",
    licensePlate: "XYZ-5678",
    color: "Blue",
  },
]

export default function CarsPage() {
  const [cars, setCars] = useState(initialCars)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCar, setCurrentCar] = useState(null)
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    licensePlate: "",
    color: "",
  })
  const { toast } = useToast()

  const handleAddCar = () => {
    const carToAdd = {
      id: `car-${Date.now()}`,
      ...newCar,
      year: Number.parseInt(newCar.year),
    }

    setCars([...cars, carToAdd])
    setNewCar({
      make: "",
      model: "",
      year: "",
      vin: "",
      licensePlate: "",
      color: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Car added",
      description: `Your ${newCar.make} ${newCar.model} has been added successfully.`,
    })
  }

  const handleEditCar = () => {
    const updatedCars = cars.map((car) => (car.id === currentCar.id ? { ...currentCar } : car))

    setCars(updatedCars)
    setIsEditDialogOpen(false)

    toast({
      title: "Car updated",
      description: `Your ${currentCar.make} ${currentCar.model} has been updated successfully.`,
    })
  }

  const handleDeleteCar = (id) => {
    setCars(cars.filter((car) => car.id !== id))

    toast({
      title: "Car removed",
      description: "The car has been removed from your account.",
    })
  }

  const openEditDialog = (car) => {
    setCurrentCar(car)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Cars</h1>
          <p className="text-muted-foreground">Manage your vehicles for towing services</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Car
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Car</DialogTitle>
              <DialogDescription>Enter the details of your vehicle to add it to your account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    placeholder="Toyota"
                    value={newCar.make}
                    onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="Camry"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    placeholder="2020"
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    placeholder="Silver"
                    value={newCar.color}
                    onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input
                  id="vin"
                  placeholder="1HGCM82633A123456"
                  value={newCar.vin}
                  onChange={(e) => setNewCar({ ...newCar, vin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licensePlate">License Plate</Label>
                <Input
                  id="licensePlate"
                  placeholder="ABC-1234"
                  value={newCar.licensePlate}
                  onChange={(e) => setNewCar({ ...newCar, licensePlate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCar}>Add Car</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Card key={car.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                {car.make} {car.model}
              </CardTitle>
              <CardDescription>
                {car.year} • {car.color}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">License Plate</p>
                  <p className="text-muted-foreground">{car.licensePlate}</p>
                </div>
                <div>
                  <p className="font-medium">VIN</p>
                  <p className="text-muted-foreground">{car.vin}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => openEditDialog(car)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteCar(car.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Car className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No cars added yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">Add your first car to request towing services.</p>
          <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Car
          </Button>
        </div>
      )}

      {currentCar && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Car</DialogTitle>
              <DialogDescription>Update the details of your vehicle.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-make">Make</Label>
                  <Input
                    id="edit-make"
                    value={currentCar.make}
                    onChange={(e) => setCurrentCar({ ...currentCar, make: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-model">Model</Label>
                  <Input
                    id="edit-model"
                    value={currentCar.model}
                    onChange={(e) => setCurrentCar({ ...currentCar, model: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    type="number"
                    value={currentCar.year}
                    onChange={(e) =>
                      setCurrentCar({
                        ...currentCar,
                        year: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-color">Color</Label>
                  <Input
                    id="edit-color"
                    value={currentCar.color}
                    onChange={(e) => setCurrentCar({ ...currentCar, color: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-vin">VIN</Label>
                <Input
                  id="edit-vin"
                  value={currentCar.vin}
                  onChange={(e) => setCurrentCar({ ...currentCar, vin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-licensePlate">License Plate</Label>
                <Input
                  id="edit-licensePlate"
                  value={currentCar.licensePlate}
                  onChange={(e) =>
                    setCurrentCar({
                      ...currentCar,
                      licensePlate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditCar}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
