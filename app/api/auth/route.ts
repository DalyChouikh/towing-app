import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/database"
import bcrypt from 'bcrypt'; // Import bcrypt

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Basic input validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await getUserByEmail(email); // Await the async function

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // --- Real Password Check ---
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash); // Use bcrypt.compare

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    // --- End Real Password Check ---

    // Return user data (excluding password hash)
    return NextResponse.json({
      user: {
        id: user.userID, // Use userID here
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
