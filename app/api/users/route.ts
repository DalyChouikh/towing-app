import { type NextRequest, NextResponse } from "next/server"
import { createUser, deleteUser, updateUser, getUserById } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (id) {
      const user = await getUserById(id)
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      const { passwordHash, ...userWithoutPassword } = user
      return NextResponse.json({ user: userWithoutPassword })
    }

    return NextResponse.json({ message: "Fetching all users not implemented without pagination. Provide an ID." }, { status: 400 })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    if (!userData.email || !userData.password || !userData.name) {
      return NextResponse.json({ error: "Missing required fields (name, email, password)" }, { status: 400 })
    }

    const newUser = await createUser({
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      passwordHash: userData.password,
      role: userData.role || "USER",
    })

    const { passwordHash, ...userWithoutPassword } = newUser
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get("id")
    const updates = await request.json()

    if (!id) {
      return NextResponse.json({ error: "User ID is required in URL path or query param" }, { status: 400 })
    }

    delete updates.password
    delete updates.passwordHash

    const updatedUser = await updateUser(id, updates)

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found or update failed" }, { status: 404 })
    }

    const { passwordHash, ...userWithoutPassword } = updatedUser
    return NextResponse.json({ user: userWithoutPassword })
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

    const deletedUser = await deleteUser(id)

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found or deletion failed" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: `User ${id} deleted` })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
