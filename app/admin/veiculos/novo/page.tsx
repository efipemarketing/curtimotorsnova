'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { VehicleForm } from '@/components/admin/vehicle-form'

export default function NovoVeiculoPage() {
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
            Novo Veículo
          </h1>
          <p className="text-muted-foreground mt-1">
            Cadastre um novo veículo no estoque
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-6"
      >
        <VehicleForm />
      </motion.div>
    </div>
  )
}
