// This is a mock database service for demonstration purposes
// In a real application, you would use a real database like PostgreSQL

import { v4 as uuidv4 } from "uuid"

// Types based on the UML diagram
export type TowRequestStatus =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED"

export type TowerAvailabilityStatus = "AVAILABLE" | "BUSY" | "OFFLINE"

export type Role = "ADMIN" | "USER" | "TOWER" | "REPAIRER" | "ASSURANCE_REP" | "AGENCY_REP"

export interface User {
  userID: string
  name: string
  email: string
  phoneNumber: string
  passwordHash: string
  role: Role
}

export interface Car {
  carID: string
  userID: string
  make: string
  model: string
  year: number
  vin: string
  licensePlate: string
  color: string
}

export interface Location {
  latitude: number
  longitude: number
  addressString: string
}

export interface TowRequest {
  requestID: string
  userID: string
  carID: string
  requestTime: Date
  status: TowRequestStatus
  pickupLocation: Location
  destinationID: string
  towerID?: string
  estimatedCost?: number
  actualCost?: number
  estimatedArrivalTime?: Date
  actualCompletionTime?: Date
  notes?: string
}

export interface Tower {
  towerID: string
  userID: string
  companyName: string
  driverName: string
  contactNumber: string
  vehicleDetails: string
  availability: TowerAvailabilityStatus
  currentLocation?: Location
}

export interface Destination {
  destinationID: string
  type: "RepairShop" | "CarAgency" | "AssuranceCompany"
  name: string
  phoneNumber: string
  operatingHours: string
  location: Location
  userID: string // The user who manages this destination
}

// Mock database tables
let users: User[] = []
let cars: Car[] = []
let towRequests: TowRequest[] = []
let towers: Tower[] = []
let destinations: Destination[] = []

// User CRUD operations
export const createUser = (user: Omit<User, "userID">): User => {
  const newUser = { ...user, userID: uuidv4() }
  users.push(newUser)
  return newUser
}

export const getUserById = (userID: string): User | undefined => {
  return users.find((user) => user.userID === userID)
}

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email)
}

export const updateUser = (userID: string, updates: Partial<User>): User | undefined => {
  const index = users.findIndex((user) => user.userID === userID)
  if (index !== -1) {
    users[index] = { ...users[index], ...updates }
    return users[index]
  }
  return undefined
}

export const deleteUser = (userID: string): boolean => {
  const initialLength = users.length
  users = users.filter((user) => user.userID !== userID)
  return users.length !== initialLength
}

// Car CRUD operations
export const createCar = (car: Omit<Car, "carID">): Car => {
  const newCar = { ...car, carID: uuidv4() }
  cars.push(newCar)
  return newCar
}

export const getCarById = (carID: string): Car | undefined => {
  return cars.find((car) => car.carID === carID)
}

export const getCarsByUserId = (userID: string): Car[] => {
  return cars.filter((car) => car.userID === userID)
}

export const updateCar = (carID: string, updates: Partial<Car>): Car | undefined => {
  const index = cars.findIndex((car) => car.carID === carID)
  if (index !== -1) {
    cars[index] = { ...cars[index], ...updates }
    return cars[index]
  }
  return undefined
}

export const deleteCar = (carID: string): boolean => {
  const initialLength = cars.length
  cars = cars.filter((car) => car.carID !== carID)
  return cars.length !== initialLength
}

// TowRequest CRUD operations
export const createTowRequest = (request: Omit<TowRequest, "requestID">): TowRequest => {
  const newRequest = { ...request, requestID: uuidv4() }
  towRequests.push(newRequest)
  return newRequest
}

export const getTowRequestById = (requestID: string): TowRequest | undefined => {
  return towRequests.find((request) => request.requestID === requestID)
}

export const getTowRequestsByUserId = (userID: string): TowRequest[] => {
  return towRequests.filter((request) => request.userID === userID)
}

export const getTowRequestsByTowerId = (towerID: string): TowRequest[] => {
  return towRequests.filter((request) => request.towerID === towerID)
}

export const updateTowRequest = (requestID: string, updates: Partial<TowRequest>): TowRequest | undefined => {
  const index = towRequests.findIndex((request) => request.requestID === requestID)
  if (index !== -1) {
    towRequests[index] = { ...towRequests[index], ...updates }
    return towRequests[index]
  }
  return undefined
}

export const deleteTowRequest = (requestID: string): boolean => {
  const initialLength = towRequests.length
  towRequests = towRequests.filter((request) => request.requestID !== requestID)
  return towRequests.length !== initialLength
}

// Tower CRUD operations
export const createTower = (tower: Omit<Tower, "towerID">): Tower => {
  const newTower = { ...tower, towerID: uuidv4() }
  towers.push(newTower)
  return newTower
}

export const getTowerById = (towerID: string): Tower | undefined => {
  return towers.find((tower) => tower.towerID === towerID)
}

export const getTowerByUserId = (userID: string): Tower | undefined => {
  return towers.find((tower) => tower.userID === userID)
}

export const updateTower = (towerID: string, updates: Partial<Tower>): Tower | undefined => {
  const index = towers.findIndex((tower) => tower.towerID === towerID)
  if (index !== -1) {
    towers[index] = { ...towers[index], ...updates }
    return towers[index]
  }
  return undefined
}

export const deleteTower = (towerID: string): boolean => {
  const initialLength = towers.length
  towers = towers.filter((tower) => tower.towerID !== towerID)
  return towers.length !== initialLength
}

// Destination CRUD operations
export const createDestination = (destination: Omit<Destination, "destinationID">): Destination => {
  const newDestination = { ...destination, destinationID: uuidv4() }
  destinations.push(newDestination)
  return newDestination
}

export const getDestinationById = (destinationID: string): Destination | undefined => {
  return destinations.find((destination) => destination.destinationID === destinationID)
}

export const getDestinationsByType = (type: Destination["type"]): Destination[] => {
  return destinations.filter((destination) => destination.type === type)
}

export const getDestinationsByUserId = (userID: string): Destination[] => {
  return destinations.filter((destination) => destination.userID === userID)
}

export const updateDestination = (destinationID: string, updates: Partial<Destination>): Destination | undefined => {
  const index = destinations.findIndex((destination) => destination.destinationID === destinationID)
  if (index !== -1) {
    destinations[index] = { ...destinations[index], ...updates }
    return destinations[index]
  }
  return undefined
}

export const deleteDestination = (destinationID: string): boolean => {
  const initialLength = destinations.length
  destinations = destinations.filter((destination) => destination.destinationID !== destinationID)
  return destinations.length !== initialLength
}

// Initialize with some sample data
export const initializeDatabase = () => {
  // Create sample users
  const adminUser = createUser({
    name: "Admin User",
    email: "admin@example.com",
    phoneNumber: "555-999-8888",
    passwordHash: "hashed_password",
    role: "ADMIN",
  })

  const regularUser = createUser({
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "555-123-4567",
    passwordHash: "hashed_password",
    role: "USER",
  })

  const towerUser = createUser({
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "555-987-6543",
    passwordHash: "hashed_password",
    role: "TOWER",
  })

  const repairerUser = createUser({
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phoneNumber: "555-456-7890",
    passwordHash: "hashed_password",
    role: "REPAIRER",
  })

  // Create sample cars
  const car1 = createCar({
    userID: regularUser.userID,
    make: "Toyota",
    model: "Camry",
    year: 2020,
    vin: "1HGCM82633A123456",
    licensePlate: "ABC-1234",
    color: "Silver",
  })

  const car2 = createCar({
    userID: regularUser.userID,
    make: "Honda",
    model: "Civic",
    year: 2019,
    vin: "2HGFC2F52KH123456",
    licensePlate: "XYZ-5678",
    color: "Blue",
  })

  // Create sample tower
  const tower = createTower({
    userID: towerUser.userID,
    companyName: "Fast Tow Services",
    driverName: "Jane Smith",
    contactNumber: "555-987-6543",
    vehicleDetails: "Flatbed Truck",
    availability: "AVAILABLE",
    currentLocation: {
      latitude: 40.7128,
      longitude: -74.006,
      addressString: "123 Tow St, New York, NY",
    },
  })

  // Create sample destinations
  const repairShop = createDestination({
    type: "RepairShop",
    name: "Quick Fix Auto Repair",
    phoneNumber: "555-456-7890",
    operatingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    location: {
      latitude: 40.72,
      longitude: -74.01,
      addressString: "789 Repair Ave, New York, NY",
    },
    userID: repairerUser.userID,
  })

  // Create sample tow request
  createTowRequest({
    userID: regularUser.userID,
    carID: car1.carID,
    requestTime: new Date(),
    status: "PENDING",
    pickupLocation: {
      latitude: 40.73,
      longitude: -74.02,
      addressString: "123 Main St, New York, NY",
    },
    destinationID: repairShop.destinationID,
    notes: "Car won't start, possibly battery issue.",
  })
}

// Initialize the database
initializeDatabase()
