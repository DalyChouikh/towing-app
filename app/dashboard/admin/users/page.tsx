"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Edit, Plus, Search, Trash } from "lucide-react"

// Mock data for users
const initialUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "USER",
    phoneNumber: "555-123-4567",
    createdAt: "2023-01-15T10:30:00",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "TOWER",
    phoneNumber: "555-987-6543",
    createdAt: "2023-02-20T14:45:00",
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "REPAIRER",
    phoneNumber: "555-456-7890",
    createdAt: "2023-03-10T09:15:00",
  },
  {
    id: "user-4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "ASSURANCE_REP",
    phoneNumber: "555-789-0123",
    createdAt: "2023-04-05T16:30:00",
  },
  {
    id: "user-5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "AGENCY_REP",
    phoneNumber: "555-234-5678",
    createdAt: "2023-04-25T11:45:00",
  },
  {
    id: "user-6",
    name: "Admin User",
    email: "admin@example.com",
    role: "ADMIN",
    phoneNumber: "555-999-8888",
    createdAt: "2023-01-01T08:00:00",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "USER",
    phoneNumber: "",
  })
  const { toast } = useToast()

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    const userToAdd = {
      id: `user-${Date.now()}`,
      ...newUser,
      createdAt: new Date().toISOString(),
    }

    setUsers([...users, userToAdd])
    setNewUser({
      name: "",
      email: "",
      role: "USER",
      phoneNumber: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "User added",
      description: `${newUser.name} has been added successfully.`,
    })
  }

  const handleEditUser = () => {
    const updatedUsers = users.map((user) => (user.id === currentUser.id ? { ...currentUser } : user))

    setUsers(updatedUsers)
    setIsEditDialogOpen(false)

    toast({
      title: "User updated",
      description: `${currentUser.name}'s information has been updated successfully.`,
    })
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))

    toast({
      title: "User removed",
      description: "The user has been removed from the system.",
    })
  }

  const openEditDialog = (user) => {
    setCurrentUser(user)
    setIsEditDialogOpen(true)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Admin</Badge>
      case "USER":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">User</Badge>
      case "TOWER":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tower</Badge>
      case "REPAIRER":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Repairer</Badge>
      case "ASSURANCE_REP":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Insurance</Badge>
      case "AGENCY_REP":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Agency</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts in the system</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New User</DialogTitle>
              <DialogDescription>Enter the details to create a new user account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="555-123-4567"
                  value={newUser.phoneNumber}
                  onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="TOWER">Tower</SelectItem>
                    <SelectItem value="REPAIRER">Repairer</SelectItem>
                    <SelectItem value="ASSURANCE_REP">Insurance Rep</SelectItem>
                    <SelectItem value="AGENCY_REP">Agency Rep</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(user)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {currentUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Update user information</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phoneNumber">Phone Number</Label>
                <Input
                  id="edit-phoneNumber"
                  value={currentUser.phoneNumber}
                  onChange={(e) =>
                    setCurrentUser({
                      ...currentUser,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="TOWER">Tower</SelectItem>
                    <SelectItem value="REPAIRER">Repairer</SelectItem>
                    <SelectItem value="ASSURANCE_REP">Insurance Rep</SelectItem>
                    <SelectItem value="AGENCY_REP">Agency Rep</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
