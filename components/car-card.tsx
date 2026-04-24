'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Gauge, Fuel, Settings2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Vehicle } from '@/lib/types'
import { FUEL_TYPES, TRANSMISSION_TYPES, STATUS_TYPES } from '@/lib/types'

interface CarCardProps {
  vehicle: Vehicle
  index?: number
}

export function CarCard({ vehicle, index = 0 }: CarCardProps) {
  const statusColors = {
    available: 'bg-green-500/10 text-green-500 border-green-500/20',
    reserved: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    sold: 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('pt-BR').format(mileage) + ' km'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/estoque/${vehicle.id}`}>
        <Card className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={vehicle.images[0] || '/placeholder-car.jpg'}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Status Badge */}
            <Badge
              variant="outline"
              className={cn('absolute top-3 left-3', statusColors[vehicle.status])}
            >
              {STATUS_TYPES[vehicle.status]}
            </Badge>

            {/* Featured Badge */}
            {vehicle.featured && (
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                Destaque
              </Badge>
            )}

            {/* Quick Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-white text-sm font-medium">Ver detalhes</span>
            </div>
          </div>

          <CardContent className="p-5">
            {/* Brand & Model */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {vehicle.brand}
              </p>
              <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {vehicle.model}
              </h3>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">{vehicle.year}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-4 w-4 text-primary" />
                <span className="text-sm">{formatMileage(vehicle.mileage)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Fuel className="h-4 w-4 text-primary" />
                <span className="text-sm">{FUEL_TYPES[vehicle.fuel]}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Settings2 className="h-4 w-4 text-primary" />
                <span className="text-sm">{TRANSMISSION_TYPES[vehicle.transmission]}</span>
              </div>
            </div>

            {/* Price */}
            <div className="pt-3 border-t border-border">
              <p className="text-2xl font-heading font-bold text-primary">
                {formatPrice(vehicle.price)}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
