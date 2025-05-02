import { type NextRequest, NextResponse } from "next/server"
import { getCarById, getCarsByUserId } from "@/lib/database" // Import getCarsByUserId

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const userId = url.searchParams.get('userId');

    if (id) {
      const car = await getCarById(id); // Await async function
      if (!car) {
        // Prisma returns null if not found
        return NextResponse.json(
          { error: 'Car not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ car });
    }

    if (userId) {
      const cars = await getCarsByUserId(userId); // Await async function, use correct function name
      // findMany returns an empty array if none found, not null
      // No need to check for !cars, just return the array (which might be empty)
      return NextResponse.json({ cars });
    }

    return NextResponse.json(
      { error: 'An id (for a single car) or userId (for a list of cars) query parameter is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching car(s):', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add POST, PUT, DELETE handlers for cars similarly, using the async functions from lib/database.ts
// Example POST:
/*
export async function POST(request: NextRequest) {
    try {
        const carData = await request.json();
        // Add validation for carData (e.g., ensure userID, make, model, etc. are present)
        if (!carData.userID || !carData.make || !carData.model || !carData.year || !carData.vin || !carData.licensePlate) {
             return NextResponse.json({ error: "Missing required car fields" }, { status: 400 });
        }
        const newCar = await createCar(carData);
        return NextResponse.json({ car: newCar }, { status: 201 });
    } catch (error) {
        // Handle potential errors like unique constraint violation (VIN, licensePlate)
        if (error.code === 'P2002') {
             return NextResponse.json({ error: "VIN or License Plate already exists" }, { status: 409 });
        }
        console.error("Error creating car:", error);
        return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
    }
}
*/