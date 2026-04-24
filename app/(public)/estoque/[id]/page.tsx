'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  Cog,
  Zap,
  DoorOpen,
  MessageCircle,
  CalendarCheck,
  Share2,
  Heart,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { CarGallery } from '@/components/car-gallery'
import { CarCard } from '@/components/car-card'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion-wrapper'
import { getVehicleById, mockVehicles } from '@/lib/mock-data'
import { FUEL_TYPES, TRANSMISSION_TYPES, STATUS_TYPES } from '@/lib/types'
import { cn } from '@/lib/utils'

interface VehiclePageProps {
  params: Promise<{ id: string }>
}

export default function VehiclePage({ params }: VehiclePageProps) {
  const { id } = use(params)
  const vehicle = getVehicleById(id)

  if (!vehicle) {
    notFound()
  }

  const relatedVehicles = mockVehicles
    .filter((v) => v.id !== vehicle.id && v.brand === vehicle.brand && v.status !== 'sold')
    .slice(0, 3)

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

  const statusColors = {
    available: 'bg-green-500/10 text-green-500 border-green-500/20',
    reserved: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    sold: 'bg-red-500/10 text-red-500 border-red-500/20',
  }

  const specs = [
    { icon: Calendar, label: 'Ano', value: vehicle.year },
    { icon: Gauge, label: 'Quilometragem', value: formatMileage(vehicle.mileage) },
    { icon: Fuel, label: 'Combustível', value: FUEL_TYPES[vehicle.fuel] },
    { icon: Settings2, label: 'Câmbio', value: TRANSMISSION_TYPES[vehicle.transmission] },
    { icon: Palette, label: 'Cor', value: vehicle.color },
    { icon: Cog, label: 'Motor', value: vehicle.engine },
    { icon: Zap, label: 'Potência', value: vehicle.power },
    { icon: DoorOpen, label: 'Portas', value: vehicle.doors },
  ]

  const vehicleName = `${vehicle.brand} ${vehicle.model}`
  const whatsappMessage = `Olá! Tenho interesse no veículo: ${vehicleName} (${vehicle.year}). Gostaria de mais informações.`

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-border bg-card">
        <div className="container px-4 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/estoque" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Voltar ao Estoque
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{vehicleName}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Gallery Column */}
            <div className="lg:col-span-2">
              <FadeIn>
                <CarGallery images={vehicle.images} vehicleName={vehicleName} />
              </FadeIn>
            </div>

            {/* Info Column */}
            <div className="space-y-6">
              <FadeIn delay={0.2}>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className={cn(statusColors[vehicle.status])}>
                      {STATUS_TYPES[vehicle.status]}
                    </Badge>
                    {vehicle.featured && (
                      <Badge className="bg-primary text-primary-foreground">Destaque</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">
                    {vehicle.brand}
                  </p>
                  <h1 className="text-3xl font-heading font-bold mt-1">
                    {vehicle.model}
                  </h1>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <p className="text-4xl font-heading font-bold text-primary">
                    {formatPrice(vehicle.price)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ou consulte condições de financiamento
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2"
                    size="lg"
                  >
                    <a
                      href={`https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Falar pelo WhatsApp
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Link href={`/estoque/${vehicle.id}/agendar`}>
                      <CalendarCheck className="h-5 w-5" />
                      Agendar Test-Drive
                    </Link>
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Share2 className="h-4 w-4" />
                      Compartilhar
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Heart className="h-4 w-4" />
                      Favoritar
                    </Button>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="grid grid-cols-2 gap-4">
                    {specs.slice(0, 4).map((spec) => (
                      <div key={spec.label} className="flex items-center gap-2">
                        <spec.icon className="h-4 w-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">{spec.label}</p>
                          <p className="text-sm font-medium">{spec.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="py-8 lg:py-12 bg-card border-y border-border">
        <div className="container px-4 lg:px-8">
          <FadeIn>
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-8">
                <TabsTrigger
                  value="specs"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Especificações
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Equipamentos
                </TabsTrigger>
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                >
                  Descrição
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-0">
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {specs.map((spec) => (
                    <StaggerItem key={spec.label}>
                      <div className="p-4 rounded-lg bg-background border border-border">
                        <spec.icon className="h-6 w-6 text-primary mb-3" />
                        <p className="text-sm text-muted-foreground">{spec.label}</p>
                        <p className="font-medium">{spec.value}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </TabsContent>

              <TabsContent value="features" className="mt-0">
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.features.map((feature) => (
                    <StaggerItem key={feature}>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </TabsContent>

              <TabsContent value="description" className="mt-0">
                <div className="max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </section>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="container px-4 lg:px-8">
            <FadeIn>
              <h2 className="text-2xl font-heading font-bold mb-8">
                Outros veículos {vehicle.brand}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVehicles.map((v, index) => (
                <CarCard key={v.id} vehicle={v} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-card border-t border-border">
        <div className="container px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl font-heading font-bold mb-4">
              Interessado neste veículo?
            </h2>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco para mais informações ou agende uma visita 
              para conhecer este {vehicleName} pessoalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-[#25D366] hover:bg-[#25D366]/90 text-white gap-2"
                size="lg"
              >
                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contato">
                  Entre em Contato
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
