import { PrismaClient, Role } from '../lib/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  const saltRounds = 10;
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create Users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      phoneNumber: '555-999-8888',
      passwordHash: hashedPassword,
      role: Role.ADMIN,
    },
  });
  console.log(`Created admin user: ${adminUser.name} (ID: ${adminUser.userID})`);

  const regularUser = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '555-123-4567',
      passwordHash: hashedPassword,
      role: Role.USER,
    },
  });
  console.log(`Created regular user: ${regularUser.name} (ID: ${regularUser.userID})`);

  const towerUser = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '555-987-6543',
      passwordHash: hashedPassword,
      role: Role.TOWER,
    },
  });
  console.log(`Created tower user: ${towerUser.name} (ID: ${towerUser.userID})`);

  const repairerUser = await prisma.user.upsert({
    where: { email: 'bob.johnson@example.com' },
    update: {},
    create: {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phoneNumber: '555-456-7890',
      passwordHash: hashedPassword,
      role: Role.REPAIRER,
    },
  });
  console.log(`Created repairer user: ${repairerUser.name} (ID: ${repairerUser.userID})`);

  // Create Cars
  const car1 = await prisma.car.upsert({
    where: { licensePlate: 'ABC-1234' },
    update: {},
    create: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      vin: '1HGCM82633A123456',
      licensePlate: 'ABC-1234',
      color: 'Silver',
      userID: regularUser.userID,
    },
  });
  console.log(`Created car: ${car1.make} ${car1.model} (ID: ${car1.carID})`);

  const car2 = await prisma.car.upsert({
    where: { licensePlate: 'XYZ-5678' },
    update: {},
    create: {
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      vin: '2HGFC2F52KH123456',
      licensePlate: 'XYZ-5678',
      color: 'Blue',
      userID: regularUser.userID,
    },
  });
  console.log(`Created car: ${car2.make} ${car2.model} (ID: ${car2.carID})`);

  // Create Tower Profile
  const towerProfile = await prisma.tower.upsert({
    where: { userID: towerUser.userID },
    update: {},
    create: {
      companyName: 'Fast Tow Services',
      driverName: 'Jane Smith',
      contactNumber: '555-987-6543',
      vehicleDetails: 'Flatbed Truck',
      availability: 'AVAILABLE',
      serviceArea: 'Anytown and surrounding areas',
      serviceDescription: '24/7 towing services for all vehicle types.',
      rates: { baseRate: 75, perMileRate: 3.50, afterHoursRate: 100 },
      currentLocation: {
        latitude: 40.7128,
        longitude: -74.006,
        addressString: '123 Tow St, New York, NY',
      },
      userID: towerUser.userID,
    },
  });
  console.log(`Created tower profile: ${towerProfile.companyName} (ID: ${towerProfile.towerID})`);

  // Create Destination
  const repairShop = await prisma.destination.upsert({
    where: { destinationID: "1" }, // Assuming name is unique for upsert
    update: {},
    create: {
      type: 'RepairShop',
      name: 'Quick Fix Auto Repair',
      phoneNumber: '555-456-7890',
      operatingHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM',
      location: {
        latitude: 40.72,
        longitude: -74.01,
        addressString: '789 Repair Ave, New York, NY',
      },
      userID: repairerUser.userID,
    },
  });
  console.log(`Created destination: ${repairShop.name} (ID: ${repairShop.destinationID})`);

  // Create Tow Request
  const towRequest = await prisma.towRequest.create({
    data: {
      userID: regularUser.userID,
      carID: car1.carID,
      status: 'PENDING',
      pickupLocation: {
        latitude: 40.73,
        longitude: -74.02,
        addressString: '123 Main St, New York, NY',
      },
      destinationID: repairShop.destinationID,
      notes: "Car won't start, possibly battery issue.",
      estimatedCost: 85.50, // Example cost
    },
  });
  console.log(`Created tow request (ID: ${towRequest.requestID})`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
