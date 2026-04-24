'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Car } from 'lucide-react'
import { CarCard } from '@/components/car-card'
import { FilterBar } from '@/components/filter-bar'
import { FadeIn } from '@/components/motion-wrapper'
import { mockVehicles } from '@/lib/mock-data'
import type { Vehicle } from '@/lib/types'

function filterVehicles(vehicles: Vehicle[], params: URLSearchParams): Vehicle[] {
  let filtered = [...vehicles]

  const search = params.get('search')?.toLowerCase()
  if (search) {
    filtered = filtered.filter(
      (v) =>
        v.brand.toLowerCase().includes(search) ||
        v.model.toLowerCase().includes(search) ||
        v.description.toLowerCase().includes(search)
    )
  }

  const brand = params.get('brand')
  if (brand) {
    filtered = filtered.filter((v) => v.brand === brand)
  }

  const priceRange = params.get('price')
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number)
    filtered = filtered.filter((v) => {
      if (min && max) return v.price >= min && v.price <= max
      if (min && !max) return v.price >= min
      if (!min && max) return v.price <= max
      return true
    })
  }

  const yearRange = params.get('year')
  if (yearRange) {
    const [min, max] = yearRange.split('-').map(Number)
    filtered = filtered.filter((v) => {
      if (min && max) return v.year >= min && v.year <= max
      if (min && !max) return v.year >= min
      if (!min && max) return v.year <= max
      return true
    })
  }

  const fuel = params.get('fuel')
  if (fuel) {
    filtered = filtered.filter((v) => v.fuel === fuel)
  }

  const transmission = params.get('transmission')
  if (transmission) {
    filtered = filtered.filter((v) => v.transmission === transmission)
  }

  return filtered
}

function EstoqueContent() {
  const searchParams = useSearchParams()
  const vehicles = filterVehicles(mockVehicles, searchParams)

  return (
    <>
      {/* Filter Bar */}
      <section className="py-8 bg-card border-b border-border">
        <div className="container px-4 lg:px-8">
          <FilterBar />
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-12 lg:py-16">
        <div className="container px-4 lg:px-8">
          {vehicles.length > 0 ? (
            <>
              <FadeIn className="mb-8">
                <p className="text-muted-foreground">
                  {vehicles.length} {vehicles.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle, index) => (
                  <CarCard key={vehicle.id} vehicle={vehicle} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Car className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">
                Nenhum veículo encontrado
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tente ajustar os filtros ou entre em contato conosco para encontrar o veículo ideal.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

export default function EstoquePage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-card to-background">
        <div className="container px-4 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Nosso <span className="text-primary">Estoque</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore nossa seleção de veículos premium. Encontre o carro dos seus sonhos 
              entre as melhores marcas do mercado.
            </p>
          </FadeIn>
        </div>
      </section>

      <Suspense fallback={
        <div className="container px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      }>
        <EstoqueContent />
      </Suspense>
    </>
  )
}
