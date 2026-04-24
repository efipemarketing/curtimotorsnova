'use client'

import { use, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { VehicleForm } from '@/components/admin/vehicle-form'
import { mockVehicles } from '@/lib/mock-data'

interface EditarVeiculoPageProps {
  params: Promise<{ id: string }>
}

export default function EditarVeiculoPage({ params }: EditarVeiculoPageProps) {
  const { id } = use(params)
  
  const vehicle = useMemo(() => {
    return mockVehicles.find((v) => v.id === id)
  }, [id])

  if (!vehicle) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/veiculos">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Editar Veículo
          </h1>
          <p className="text-muted-foreground mt-1">
            {vehicle.brand} {vehicle.model} - {vehicle.year}
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <VehicleForm vehicle={vehicle} />
      </motion.div>
    </div>
  )
}
