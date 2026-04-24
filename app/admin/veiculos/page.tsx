'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { mockVehicles } from '@/lib/mock-data'
import { STATUS_TYPES, BRANDS } from '@/lib/types'
import { cn } from '@/lib/utils'

export default function AdminVeiculosPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [brandFilter, setBrandFilter] = useState<string>('all')

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter
    const matchesBrand = brandFilter === 'all' || vehicle.brand === brandFilter

    return matchesSearch && matchesStatus && matchesBrand
  })

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Veículos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seu estoque de veículos
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/admin/veiculos/novo">
            <Plus className="h-4 w-4" />
            Adicionar Veículo
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border p-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar veículos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as marcas</SelectItem>
              {BRANDS.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="available">Disponível</SelectItem>
              <SelectItem value="reserved">Reservado</SelectItem>
              <SelectItem value="sold">Vendido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        {filteredVehicles.length} {filteredVehicles.length === 1 ? 'veículo encontrado' : 'veículos encontrados'}
      </p>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Foto</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead className="hidden md:table-cell">Ano</TableHead>
              <TableHead className="hidden lg:table-cell">KM</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="relative w-16 h-12 rounded-md overflow-hidden">
                    <Image
                      src={vehicle.images[0] || '/placeholder-car.jpg'}
                      alt={vehicle.model}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div>
                      <p className="font-medium">{vehicle.brand} {vehicle.model}</p>
                      <p className="text-sm text-muted-foreground hidden sm:block">
                        {vehicle.color}
                      </p>
                    </div>
                    {vehicle.featured && (
                      <Star className="h-4 w-4 text-primary fill-primary" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {vehicle.year}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatMileage(vehicle.mileage)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(vehicle.price)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(statusColors[vehicle.status])}
                  >
                    {STATUS_TYPES[vehicle.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/estoque/${vehicle.id}`} target="_blank">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver no site
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/veiculos/${vehicle.id}/editar`}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredVehicles.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Nenhum veículo encontrado.
          </div>
        )}
      </motion.div>
    </div>
  )
}
