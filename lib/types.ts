export interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  mileage: number
  color: string
  transmission: 'manual' | 'automatic'
  fuel: 'gasoline' | 'ethanol' | 'flex' | 'diesel' | 'electric' | 'hybrid'
  doors: number
  engine: string
  power: string
  features: string[]
  images: string[]
  videoUrl?: string
  description: string
  status: 'available' | 'reserved' | 'sold'
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: string
  vehicleId: string
  vehicleName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  date: Date
  time: string
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  vehicleId?: string
  createdAt: Date
  read: boolean
}

export interface Scheduling {
  id: string
  vehicleId: string
  vehicleName: string
  customerName: string
  customerEmail: string
  customerPhone: string
  preferredDate: Date
  preferredTime: string
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: Date
}

export interface AdminUser {
  uid: string
  email: string
  displayName: string
  role: 'admin' | 'editor'
  createdAt: Date
}

export interface FilterOptions {
  brand?: string
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  transmission?: string
  fuel?: string
  status?: string
}

export const BRANDS = [
  'Audi',
  'BMW',
  'Chevrolet',
  'Ferrari',
  'Ford',
  'Honda',
  'Hyundai',
  'Jaguar',
  'Jeep',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'Maserati',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Porsche',
  'Toyota',
  'Volkswagen',
  'Volvo',
] as const

export const FUEL_TYPES = {
  gasoline: 'Gasolina',
  ethanol: 'Etanol',
  flex: 'Flex',
  diesel: 'Diesel',
  electric: 'Elétrico',
  hybrid: 'Híbrido',
} as const

export const TRANSMISSION_TYPES = {
  manual: 'Manual',
  automatic: 'Automático',
} as const

export const STATUS_TYPES = {
  available: 'Disponível',
  reserved: 'Reservado',
  sold: 'Vendido',
} as const
