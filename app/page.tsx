import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Car, MapPin, Shield, Wrench } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold">TowMe</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-medium">
              Home
            </Link>
            <Link href="#services" className="font-medium">
              Services
            </Link>
            <Link href="#how-it-works" className="font-medium">
              How It Works
            </Link>
            <Link href="#contact" className="font-medium">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Fast & Reliable Car Towing Service</h1>
            <p className="text-xl text-muted-foreground max-w-[800px] mb-10">
              Request a tow truck with just a few clicks. We'll connect you with the nearest available tower to get you
              back on the road.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="services" className="py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Location-Based Towing</h3>
                <p className="text-muted-foreground">
                  Request a tow based on your current location with real-time tracking.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Repair Shop Delivery</h3>
                <p className="text-muted-foreground">Get your car towed directly to your preferred repair shop.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Insurance Coordination</h3>
                <p className="text-muted-foreground">We work with your insurance company for a seamless experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Request a Tow</h3>
                <p className="text-muted-foreground">
                  Submit a request through our app with your location and destination.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Get Connected</h3>
                <p className="text-muted-foreground">We'll match you with the nearest available tower.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Track Your Tow</h3>
                <p className="text-muted-foreground">
                  Monitor the tower's location and estimated arrival time in real-time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-auto border-t py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Car className="h-5 w-5" />
            <span className="font-bold">TowMe</span>
          </div>
          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>© 2025 TowMe. All rights reserved.</p>
            <p>University Project - Software Analysis and Design Methodologies</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
