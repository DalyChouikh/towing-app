import { type NextRequest, NextResponse } from "next/server"
import { createUser, deleteUser, updateUser, getUserById } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (id) {
      const user = getUserById(id)
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      return NextResponse.json({ user })
    }

    // In a real app, you would implement pagination and filtering
    // For demo purposes, we'll return a mock response
    return NextResponse.json({
      users: [
        {
          id: "user-1",
          name: "John Doe",
          email: "john.doe@example.com",
          role: "USER",
        },
        {
          id: "user-2",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "TOWER",
        },
      ],
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // In a real app, you would validate the input data

    const newUser = createUser({
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber || "",
      passwordHash: "hashed_password", // In a real app, you would hash the password
      role: userData.role || "USER",
    })

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const updatedUser = updateUser(id, updates)

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const success = deleteUser(id)

    if (!success) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
