'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Car,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/admin/stats-card'
import { mockVehicles } from '@/lib/mock-data'
import { STATUS_TYPES } from '@/lib/types'
import { cn } from '@/lib/utils'

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    customerName: 'João Silva',
    vehicleName: 'Porsche 911 Carrera S',
    date: new Date('2024-01-20'),
    time: '10:00',
    status: 'pending' as const,
  },
  {
    id: '2',
    customerName: 'Maria Santos',
    vehicleName: 'Mercedes-AMG GT 63',
    date: new Date('2024-01-20'),
    time: '14:00',
    status: 'confirmed' as const,
  },
  {
    id: '3',
    customerName: 'Pedro Costa',
    vehicleName: 'BMW M4 Competition',
    date: new Date('2024-01-21'),
    time: '11:00',
    status: 'pending' as const,
  },
]

export default function AdminDashboardPage() {
  const availableVehicles = mockVehicles.filter((v) => v.status === 'available').length
  const reservedVehicles = mockVehicles.filter((v) => v.status === 'reserved').length
  const soldVehicles = mockVehicles.filter((v) => v.status === 'sold').length
  const featuredVehicles = mockVehicles.filter((v) => v.featured).length

  const totalValue = mockVehicles
    .filter((v) => v.status === 'available')
    .reduce((sum, v) => sum + v.price, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
    }).format(date)
  }

  const statusColors = {
    pending: 'bg-yellow-500/10 text-yellow-500',
    confirmed: 'bg-green-500/10 text-green-500',
    cancelled: 'bg-red-500/10 text-red-500',
    completed: 'bg-blue-500/10 text-blue-500',
  }

  const statusLabels = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    completed: 'Concluído',
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do seu negócio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Veículos Disponíveis"
          value={availableVehicles}
          description={`${featuredVehicles} em destaque`}
          icon={Car}
          trend={{ value: 12, isPositive: true }}
          index={0}
        />
        <StatsCard
          title="Reservados"
          value={reservedVehicles}
          description="Aguardando fechamento"
          icon={CalendarCheck}
          index={1}
        />
        <StatsCard
          title="Vendidos este mês"
          value={soldVehicles}
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          index={2}
        />
        <StatsCard
          title="Valor em Estoque"
          value={formatPrice(totalValue)}
          icon={DollarSign}
          index={3}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-semibold">
              Próximos Agendamentos
            </h2>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/admin/agendamentos">
                Ver todos
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {appointment.vehicleName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatDate(appointment.date)} às {appointment.time}
                  </p>
                  <span
                    className={cn(
                      'inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1',
                      statusColors[appointment.status]
                    )}
                  >
                    {statusLabels[appointment.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Vehicles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-heading font-semibold">
              Veículos Recentes
            </h2>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="/admin/veiculos">
                Ver todos
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {mockVehicles.slice(0, 4).map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
              >
                <div>
                  <p className="font-medium">
                    {vehicle.brand} {vehicle.model}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.year} • {formatPrice(vehicle.price)}
                  </p>
                </div>
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    vehicle.status === 'available' && 'bg-green-500/10 text-green-500',
                    vehicle.status === 'reserved' && 'bg-yellow-500/10 text-yellow-500',
                    vehicle.status === 'sold' && 'bg-red-500/10 text-red-500'
                  )}
                >
                  {STATUS_TYPES[vehicle.status]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <h2 className="text-lg font-heading font-semibold mb-4">
          Ações Rápidas
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/admin/veiculos/novo">
              Adicionar Veículo
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/agendamentos">
              Ver Agendamentos
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/" target="_blank">
              Ver Site
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
