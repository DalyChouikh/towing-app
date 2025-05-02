"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Car, ClipboardList, Home, LogOut, MapPin, Menu, Settings, User, Users, X, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"

export default function DashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const isAdmin = user?.role === "ADMIN"
  const isTower = user?.role === "TOWER"
  const isUser = user?.role === "USER"
  const isRepairer = user?.role === "REPAIRER"
  const isAssurance = user?.role === "ASSURANCE_REP"
  const isAgency = user?.role === "AGENCY_REP"

  const NavLink = ({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: React.ElementType
    children: React.ReactNode
  }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
        )}
        onClick={() => setOpen(false)}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Link>
    )
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          <span className="text-lg font-bold">TowMe</span>
        </Link>
        <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <NavLink href="/dashboard" icon={Home}>
            Dashboard
          </NavLink>

          {isUser && (
            <>
              <NavLink href="/dashboard/cars" icon={Car}>
                My Cars
              </NavLink>
              <NavLink href="/dashboard/request-tow" icon={MapPin}>
                Request Tow
              </NavLink>
              <NavLink href="/dashboard/my-requests" icon={ClipboardList}>
                My Requests
              </NavLink>
            </>
          )}

          {isTower && (
            <>
              <NavLink href="/dashboard/tower-profile" icon={User}>
                Tower Profile
              </NavLink>
              <NavLink href="/dashboard/tow-requests" icon={ClipboardList}>
                Tow Requests
              </NavLink>
            </>
          )}

          {(isRepairer || isAssurance || isAgency) && (
            <>
              <NavLink href="/dashboard/destination-profile" icon={Building}>
                Destination Profile
              </NavLink>
              <NavLink href="/dashboard/incoming-tows" icon={ClipboardList}>
                Incoming Tows
              </NavLink>
            </>
          )}

          {isAdmin && (
            <>
              <NavLink href="/dashboard/users" icon={Users}>
                Manage Users
              </NavLink>
              <NavLink href="/dashboard/towers" icon={Car}>
                Manage Towers
              </NavLink>
              <NavLink href="/dashboard/destinations" icon={Building}>
                Manage Destinations
              </NavLink>
            </>
          )}

          <NavLink href="/dashboard/profile" icon={User}>
            My Profile
          </NavLink>
          <NavLink href="/dashboard/settings" icon={Settings}>
            Settings
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex flex-col">
            <span className="font-medium">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="hidden w-64 flex-shrink-0 border-r md:block">
        <SidebarContent />
      </div>
    </>
  )
}
