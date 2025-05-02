"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Car, Check, Clock, MapPin, X } from "lucide-react";

// Mock data for tow requests
const towRequests = [
  {
    id: "req-1",
    user: {
      name: "John Doe",
      phone: "555-123-4567",
    },
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
    destinationAddress: "789 Repair Ave, Anytown",
    distance: 5.2,
    estimatedCost: 93.2,
  },
  {
    id: "req-2",
    user: {
      name: "Jane Smith",
      phone: "555-987-6543",
    },
    car: {
      make: "Honda",
      model: "Civic",
      year: 2019,
      licensePlate: "XYZ-5678",
    },
    requestTime: "2023-05-01T11:15:00",
    status: "PENDING",
    pickupLocation: "456 Oak Ave, Anytown",
    destination: "Toyota Dealership",
    destinationAddress: "123 Dealer Blvd, Anytown",
    distance: 8.7,
    estimatedCost: 105.45,
  },
  {
    id: "req-3",
    user: {
      name: "Bob Johnson",
      phone: "555-456-7890",
    },
    car: {
      make: "Ford",
      model: "F-150",
      year: 2021,
      licensePlate: "DEF-9012",
    },
    requestTime: "2023-05-01T09:45:00",
    status: "ACCEPTED",
    pickupLocation: "789 Pine Blvd, Anytown",
    destination: "Safe Drive Insurance",
    destinationAddress: "456 Insurance Way, Anytown",
    distance: 3.5,
    estimatedCost: 87.25,
    estimatedArrivalTime: "2023-05-01T10:15:00",
  },
  {
    id: "req-4",
    user: {
      name: "Alice Williams",
      phone: "555-789-0123",
    },
    car: {
      make: "Chevrolet",
      model: "Malibu",
      year: 2018,
      licensePlate: "GHI-3456",
    },
    requestTime: "2023-05-01T08:30:00",
    status: "IN_PROGRESS",
    pickupLocation: "321 Elm St, Anytown",
    destination: "Quick Fix Auto Repair",
    destinationAddress: "789 Repair Ave, Anytown",
    distance: 6.8,
    estimatedCost: 98.8,
    estimatedArrivalTime: "2023-05-01T09:00:00",
  },
  {
    id: "req-5",
    user: {
      name: "Charlie Brown",
      phone: "555-234-5678",
    },
    car: {
      make: "Nissan",
      model: "Altima",
      year: 2020,
      licensePlate: "JKL-7890",
    },
    requestTime: "2023-04-30T15:45:00",
    status: "COMPLETED",
    pickupLocation: "654 Maple Dr, Anytown",
    destination: "Nissan Dealership",
    destinationAddress: "987 Auto Row, Anytown",
    distance: 4.3,
    estimatedCost: 90.05,
    actualCost: 90.05,
    estimatedArrivalTime: "2023-04-30T16:15:00",
    actualCompletionTime: "2023-04-30T16:45:00",
  },
];

export default function TowRequestsPage() {
  const [requests, setRequests] = useState(towRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            Pending
          </Badge>
        );
      case "ASSIGNED":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            Assigned
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            Accepted
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 hover:bg-purple-100"
          >
            In Progress
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Completed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Cancelled
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const acceptRequest = (id) => {
    // In a real app, this would call an API to accept the request
    const updatedRequests = requests.map((req) =>
      req.id === id
        ? {
            ...req,
            status: "ACCEPTED",
            estimatedArrivalTime: new Date(
              Date.now() + 30 * 60000
            ).toISOString(),
          }
        : req
    );
    setRequests(updatedRequests);
    toast({
      title: "Request accepted",
      description:
        "You have accepted the tow request. Please proceed to the pickup location.",
    });
  };

  const rejectRequest = (id) => {
    // In a real app, this would call an API to reject the request
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: "REJECTED" } : req
    );
    setRequests(updatedRequests);
    toast({
      title: "Request rejected",
      description: "You have rejected the tow request.",
    });
  };

  const startTow = (id) => {
    // In a real app, this would call an API to start the tow
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: "IN_PROGRESS" } : req
    );
    setRequests(updatedRequests);
    toast({
      title: "Tow started",
      description: "You have started the tow. Safe driving!",
    });
  };

  const completeTow = (id) => {
    // In a real app, this would call an API to complete the tow
    const updatedRequests = requests.map((req) =>
      req.id === id
        ? {
            ...req,
            status: "COMPLETED",
            actualCompletionTime: new Date().toISOString(),
          }
        : req
    );
    setRequests(updatedRequests);
    toast({
      title: "Tow completed",
      description: "You have completed the tow successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tow Requests</h1>
        <p className="text-muted-foreground">
          Manage incoming tow requests and active tows
        </p>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          {requests
            .filter((req) => req.status === "PENDING")
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={viewRequestDetails}
                onAccept={acceptRequest}
                onReject={rejectRequest}
                showActions={true}
              />
            ))}
          {requests.filter((req) => req.status === "PENDING").length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                No pending requests
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                There are no pending tow requests at the moment.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="accepted" className="space-y-4">
          {requests
            .filter((req) => req.status === "ACCEPTED")
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={viewRequestDetails}
                onStartTow={startTow}
                showStartButton={true}
              />
            ))}
          {requests.filter((req) => req.status === "ACCEPTED").length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                No accepted requests
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't accepted any tow requests yet.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          {requests
            .filter((req) => req.status === "IN_PROGRESS")
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={viewRequestDetails}
                onCompleteTow={completeTow}
                showCompleteButton={true}
              />
            ))}
          {requests.filter((req) => req.status === "IN_PROGRESS").length ===
            0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No active tows</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You don't have any tows in progress.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {requests
            .filter((req) => req.status === "COMPLETED")
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onViewDetails={viewRequestDetails}
              />
            ))}
          {requests.filter((req) => req.status === "COMPLETED").length ===
            0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No completed tows</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't completed any tows yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedRequest && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>
                Detailed information about the tow request
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Status</h3>
                {getStatusBadge(selectedRequest.status)}
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Customer & Vehicle</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRequest.user.name} • {selectedRequest.user.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Vehicle</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRequest.car.make} {selectedRequest.car.model} (
                      {selectedRequest.car.year})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      License Plate: {selectedRequest.car.licensePlate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Locations</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Pickup</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRequest.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Destination</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRequest.destination}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRequest.destinationAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Distance</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedRequest.distance} miles
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Timing & Cost</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Request Time</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedRequest.requestTime)}
                    </p>
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
                  <div>
                    <p className="text-sm font-medium">Estimated Cost</p>
                    <p className="text-sm text-muted-foreground">
                      ${selectedRequest.estimatedCost.toFixed(2)}
                    </p>
                  </div>
                  {selectedRequest.actualCost && (
                    <div>
                      <p className="text-sm font-medium">Final Cost</p>
                      <p className="text-sm text-muted-foreground">
                        ${selectedRequest.actualCost.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              {selectedRequest.status === "PENDING" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      rejectRequest(selectedRequest.id);
                      setIsDetailsOpen(false);
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      acceptRequest(selectedRequest.id);
                      setIsDetailsOpen(false);
                    }}
                  >
                    Accept
                  </Button>
                </>
              )}
              {selectedRequest.status === "ACCEPTED" && (
                <Button
                  onClick={() => {
                    startTow(selectedRequest.id);
                    setIsDetailsOpen(false);
                  }}
                >
                  Start Tow
                </Button>
              )}
              {selectedRequest.status === "IN_PROGRESS" && (
                <Button
                  onClick={() => {
                    completeTow(selectedRequest.id);
                    setIsDetailsOpen(false);
                  }}
                >
                  Complete Tow
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function RequestCard({
  request,
  onViewDetails,
  onAccept,
  onReject,
  onStartTow,
  onCompleteTow,
  showActions,
  showStartButton,
  showCompleteButton,
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
          >
            Pending
          </Badge>
        );
      case "ASSIGNED":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            Assigned
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-100"
          >
            Accepted
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 hover:bg-purple-100"
          >
            In Progress
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-100"
          >
            Completed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Cancelled
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-100"
          >
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

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
          Customer: {request.user.name} • {formatDate(request.requestTime)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Pickup Location</p>
            <p className="text-sm text-muted-foreground">
              {request.pickupLocation}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Destination</p>
            <p className="text-sm text-muted-foreground">
              {request.destination}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Distance</p>
            <p className="text-sm text-muted-foreground">
              {request.distance} miles
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Estimated Cost</p>
            <p className="text-sm text-muted-foreground">
              ${request.estimatedCost.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
      <div className="flex items-center justify-end gap-2 p-4 pt-0">
        {showActions && (
          <>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onReject(request.id)}
            >
              <X className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button size="sm" onClick={() => onAccept(request.id)}>
              <Check className="mr-2 h-4 w-4" />
              Accept
            </Button>
          </>
        )}
        {showStartButton && (
          <Button size="sm" onClick={() => onStartTow(request.id)}>
            Start Tow
          </Button>
        )}
        {showCompleteButton && (
          <Button size="sm" onClick={() => onCompleteTow(request.id)}>
            Complete Tow
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(request)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
