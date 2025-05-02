-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'TOWER', 'REPAIRER', 'ASSURANCE_REP', 'AGENCY_REP');

-- CreateEnum
CREATE TYPE "TowRequestStatus" AS ENUM ('PENDING', 'ASSIGNED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TowerAvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'OFFLINE');

-- CreateEnum
CREATE TYPE "DestinationType" AS ENUM ('RepairShop', 'CarAgency', 'AssuranceCompany');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Car" (
    "carID" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "vin" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carID")
);

-- CreateTable
CREATE TABLE "TowRequest" (
    "requestID" TEXT NOT NULL,
    "requestTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TowRequestStatus" NOT NULL DEFAULT 'PENDING',
    "pickupLocation" JSONB NOT NULL,
    "estimatedCost" DOUBLE PRECISION,
    "actualCost" DOUBLE PRECISION,
    "estimatedArrivalTime" TIMESTAMP(3),
    "actualCompletionTime" TIMESTAMP(3),
    "notes" TEXT,
    "userID" TEXT NOT NULL,
    "carID" TEXT NOT NULL,
    "destinationID" TEXT NOT NULL,
    "towerID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TowRequest_pkey" PRIMARY KEY ("requestID")
);

-- CreateTable
CREATE TABLE "Tower" (
    "towerID" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "driverName" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "vehicleDetails" TEXT NOT NULL,
    "availability" "TowerAvailabilityStatus" NOT NULL DEFAULT 'OFFLINE',
    "serviceArea" TEXT,
    "serviceDescription" TEXT,
    "rates" JSONB,
    "currentLocation" JSONB,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tower_pkey" PRIMARY KEY ("towerID")
);

-- CreateTable
CREATE TABLE "Destination" (
    "destinationID" TEXT NOT NULL,
    "type" "DestinationType" NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "operatingHours" TEXT,
    "location" JSONB NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("destinationID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Car_vin_key" ON "Car"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Tower_userID_key" ON "Tower"("userID");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TowRequest" ADD CONSTRAINT "TowRequest_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TowRequest" ADD CONSTRAINT "TowRequest_carID_fkey" FOREIGN KEY ("carID") REFERENCES "Car"("carID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TowRequest" ADD CONSTRAINT "TowRequest_destinationID_fkey" FOREIGN KEY ("destinationID") REFERENCES "Destination"("destinationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TowRequest" ADD CONSTRAINT "TowRequest_towerID_fkey" FOREIGN KEY ("towerID") REFERENCES "Tower"("towerID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tower" ADD CONSTRAINT "Tower_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
