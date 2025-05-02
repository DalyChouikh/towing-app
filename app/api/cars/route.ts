import { type NextRequest, NextResponse } from "next/server"
import { getCarById } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const userId = url.searchParams.get('userId');
    
    if (id) {
      const car = getCarById(id);
      if (!car) {
        return NextResponse.json(
          { error: 'Car not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ car });
    }
    if (userId) {
      const cars = await getCarById(userId);
      if (!cars) {
        return NextResponse.json(
          { error: 'Cars not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ cars });
    }
    return NextResponse.json(
      { error: 'No id or userId provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching car:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}