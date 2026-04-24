'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Calendar, Clock, MapPin, Phone } from 'lucide-react'
import { TestDriveForm } from '@/components/test-drive-form'
import { FadeIn } from '@/components/motion-wrapper'
import { getVehicleById } from '@/lib/mock-data'
import { FUEL_TYPES, TRANSMISSION_TYPES } from '@/lib/types'

interface AgendarPageProps {
  params: Promise<{ id: string }>
}

export default function AgendarPage({ params }: AgendarPageProps) {
  const { id } = use(params)
  const vehicle = getVehicleById(id)

  if (!vehicle) {
    notFound()
  }

  const vehicleName = `${vehicle.brand} ${vehicle.model}`

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
    <>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-border bg-card">
        <div className="container px-4 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link href={`/estoque/${vehicle.id}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Voltar ao Veículo
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">Agendar Test-Drive</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-12">
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                Agende Agora
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">
                Agendar Test-Drive
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Preencha o formulário abaixo para agendar seu test-drive. 
                Nossa equipe entrará em contato para confirmar o agendamento.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <FadeIn delay={0.2}>
                  <div className="bg-card p-6 lg:p-8 rounded-xl border border-border">
                    <TestDriveForm vehicleId={vehicle.id} vehicleName={vehicleName} />
                  </div>
                </FadeIn>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Vehicle Card */}
                <FadeIn delay={0.3}>
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={vehicle.images[0] || '/placeholder-car.jpg'}
                        alt={vehicleName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">
                      {vehicle.brand}
                    </p>
                    <h3 className="font-heading font-semibold text-lg">
                      {vehicle.model}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-3 text-sm text-muted-foreground">
                      <span>{vehicle.year}</span>
                      <span>•</span>
                      <span>{formatMileage(vehicle.mileage)}</span>
                      <span>•</span>
                      <span>{FUEL_TYPES[vehicle.fuel]}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-2xl font-heading font-bold text-primary">
                        {formatPrice(vehicle.price)}
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* Info Cards */}
                <FadeIn delay={0.4}>
                  <div className="bg-card p-4 rounded-xl border border-border space-y-4">
                    <h4 className="font-heading font-semibold">Informações</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Disponibilidade</p>
                          <p className="text-xs text-muted-foreground">
                            Segunda a Sexta, das 9h às 18h
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Duração</p>
                          <p className="text-xs text-muted-foreground">
                            Aproximadamente 30-45 minutos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Local</p>
                          <p className="text-xs text-muted-foreground">
                            Av. Europa, 1000 - São Paulo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Help */}
                <FadeIn delay={0.5}>
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                    <h4 className="font-heading font-semibold mb-2">Precisa de ajuda?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ligue para nossa central de atendimento.
                    </p>
                    <a
                      href="tel:+5511999999999"
                      className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      (11) 99999-9999
                    </a>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
