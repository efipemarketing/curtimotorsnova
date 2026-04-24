'use client'

import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  index?: number
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  index = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-card p-6 rounded-xl border border-border"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-heading font-bold mt-1">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <p
              className={cn(
                'text-sm font-medium mt-2',
                trend.isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% em relação ao mês anterior
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </motion.div>
  )
}
