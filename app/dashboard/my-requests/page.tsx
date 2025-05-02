"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Car, Clock, MapPin, Phone, X } from "lucide-react"

// Mock data for tow requests
const towRequests = [
  {
    id: "req-1",
    car: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      licensePlate: "ABC-1234",
    },
    requestTime: "2023-05-01T10:30:00",
    status: "PENDING",
    pickupLocation: "123 Main St, Anytown",
    destination: "Quick Fix Auto Repair",
    estimatedArrivalTime: "2023-05-01T11:15:00",
    tower: null,
  },
  {
    id: "req-2",
    car: {
      make: "Honda",
      model: "Civic",
      year: 2019,
      licensePlate: "XYZ-5678",
    },
    requestTime: "2023-04-28T14:45:00",
    status: "IN_PROGRESS",
    pickupLocation: "456 Oak Ave, Anytown",
    destination: "Toyota Dealership",
    estimatedArrivalTime: "2023-04-28T15:30:00",
    tower: {
      name: "Fast Tow Services",
      driverName: "John Smith",
      contactNumber: "555-123-4567",
      vehicleDetails: "Flatbed Truck",
    },
  },
  {
    id: "req-3",
    car: {
      make: "Toyota",
      model: "Camry",
      year: 2020,
      licensePlate: "ABC-1234",
    },
    requestTime: "2023-04-15T09:15:00",
    status: "COMPLETED",
    pickupLocation: "789 Pine Blvd, Anytown",
    destination: "Safe Drive Insurance",
    estimatedArrivalTime: "2023-04-15T10:00:00",
    actualCompletionTime: "2023-04-15T10:15:00",
    tower: {
      name: "Reliable Towing",
      driverName: "Jane Doe",
      contactNumber: "555-987-6543",
      vehicleDetails: "Hook & Chain Truck",
    },
    cost: 85.5,
  },
  {
    id: "req-4",
    car: {
      make: "Honda",
      model: "Civic",
      year: 2019,
      licensePlate: "XYZ-5678",
    },
    requestTime: "2023-04-10T16:30:00",
    status: "CANCELLED",
    pickupLocation: "321 Elm St, Anytown",
    destination: "Quick Fix Auto Repair",
    tower: null,
  },
]

export default function MyRequestsPage() {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "ASSIGNED":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Assigned
          </Badge>
        )
      case "ACCEPTED":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Accepted
          </Badge>
        )
      case "IN_PROGRESS":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            In Progress
          </Badge>
        )
      case "COMPLETED":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const viewRequestDetails = (request) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
  }

  const cancelRequest = (id) => {
    // In a real app, this would call an API to cancel the request
    console.log(`Cancelling request ${id}`)
    // Then update the UI accordingly
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tow Requests</h1>
        <p className="text-muted-foreground">View and manage your towing service requests</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {towRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onViewDetails={viewRequestDetails}
              onCancel={cancelRequest}
            />
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {towRequests
            .filter((req) => ["PENDING", "ASSIGNED", "ACCEPTED", "IN_PROGRESS"].includes(req.status))
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={viewRequestDetails}
                onCancel={cancelRequest}
              />
            ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {towRequests
            .filter((req) => req.status === "COMPLETED")
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={viewRequestDetails}
                onCancel={cancelRequest}
              />
            ))}
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-4">
          {towRequests
            .filter((req) => ["CANCELLED", "REJECTED"].includes(req.status))
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={viewRequestDetails}
                onCancel={cancelRequest}
              />
            ))}
        </TabsContent>
      </Tabs>

      {selectedRequest && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>Detailed information about your tow request</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Status</h3>
                {getStatusBadge(selectedRequest.status)}
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Vehicle</h3>
                </div>
                <p>
                  {selectedRequest.car.make} {selectedRequest.car.model} ({selectedRequest.car.year})
                </p>
                <p className="text-sm text-muted-foreground">License Plate: {selectedRequest.car.licensePlate}</p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Locations</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Pickup</p>
                    <p className="text-sm text-muted-foreground">{selectedRequest.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Destination</p>
                    <p className="text-sm text-muted-foreground">{selectedRequest.destination}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Timing</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Request Time</p>
                    <p className="text-sm text-muted-foreground">{formatDate(selectedRequest.requestTime)}</p>
                  </div>
                  {selectedRequest.estimatedArrivalTime && (
                    <div>
                      <p className="text-sm font-medium">Estimated Arrival</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedRequest.estimatedArrivalTime)}
                      </p>
                    </div>
                  )}
                  {selectedRequest.actualCompletionTime && (
                    <div>
                      <p className="text-sm font-medium">Completed At</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(selectedRequest.actualCompletionTime)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {selectedRequest.tower && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Tower Information</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Company</p>
                      <p className="text-sm text-muted-foreground">{selectedRequest.tower.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Driver</p>
                      <p className="text-sm text-muted-foreground">{selectedRequest.tower.driverName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">{selectedRequest.tower.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Vehicle</p>
                      <p className="text-sm text-muted-foreground">{selectedRequest.tower.vehicleDetails}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedRequest.cost && (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Total Cost</h3>
                    <p className="font-bold">${selectedRequest.cost.toFixed(2)}</p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              {selectedRequest.status === "PENDING" && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    cancelRequest(selectedRequest.id)
                    setIsDetailsOpen(false)
                  }}
                >
                  Cancel Request
                </Button>
              )}
              <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function RequestCard({ request, onViewDetails, onCancel }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "ASSIGNED":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Assigned
          </Badge>
        )
      case "ACCEPTED":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Accepted
          </Badge>
        )
      case "IN_PROGRESS":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            In Progress
          </Badge>
        )
      case "COMPLETED":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "CANCELLED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        )
      case "REJECTED":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {request.car.make} {request.car.model}
          </CardTitle>
          {getStatusBadge(request.status)}
        </div>
        <CardDescription>
          Request ID: {request.id} • {formatDate(request.requestTime)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Pickup Location</p>
            <p className="text-sm text-muted-foreground">{request.pickupLocation}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Destination</p>
            <p className="text-sm text-muted-foreground">{request.destination}</p>
          </div>
        </div>
        {request.tower && (
          <div className="mt-4 rounded-lg bg-muted p-3">
            <p className="text-sm font-medium">Tower: {request.tower.name}</p>
            <p className="text-sm text-muted-foreground">
              Driver: {request.tower.driverName} • {request.tower.contactNumber}
            </p>
          </div>
        )}
      </CardContent>
      <div className="flex items-center justify-end gap-2 p-4 pt-0">
        {request.status === "PENDING" && (
          <Button variant="destructive" size="sm" onClick={() => onCancel(request.id)}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => onViewDetails(request)}>
          View Details
        </Button>
      </div>
    </Card>
  )
}
