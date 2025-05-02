import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would validate the email and password
    // and check against a real database

    // For demo purposes, we'll use our mock database
    const user = getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, you would verify the password hash
    // For demo purposes, we'll skip that step

    // Create a session or token
    // In a real app, you would use a proper authentication library

    return NextResponse.json({
      user: {
        id: user.userID,
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
