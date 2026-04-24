'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { BRANDS, FUEL_TYPES, TRANSMISSION_TYPES } from '@/lib/types'

const priceRanges = [
  { value: '0-300000', label: 'Até R$ 300.000' },
  { value: '300000-500000', label: 'R$ 300.000 - R$ 500.000' },
  { value: '500000-800000', label: 'R$ 500.000 - R$ 800.000' },
  { value: '800000-1500000', label: 'R$ 800.000 - R$ 1.500.000' },
  { value: '1500000-', label: 'Acima de R$ 1.500.000' },
]

const yearRanges = [
  { value: '2024-', label: '2024+' },
  { value: '2022-2023', label: '2022 - 2023' },
  { value: '2020-2021', label: '2020 - 2021' },
  { value: '2018-2019', label: '2018 - 2019' },
  { value: '-2017', label: 'Até 2017' },
]

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const currentFilters = {
    brand: searchParams.get('brand') || '',
    price: searchParams.get('price') || '',
    year: searchParams.get('year') || '',
    fuel: searchParams.get('fuel') || '',
    transmission: searchParams.get('transmission') || '',
  }

  const activeFiltersCount = Object.values(currentFilters).filter(Boolean).length

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/estoque?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/estoque')
    setSearch('')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    router.push(`/estoque?${params.toString()}`)
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brand */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Marca</label>
        <Select
          value={currentFilters.brand || 'all'}
          onValueChange={(value) => updateFilters('brand', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas as marcas" />
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
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Faixa de Preço</label>
        <Select
          value={currentFilters.price || 'all'}
          onValueChange={(value) => updateFilters('price', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Qualquer preço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer preço</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Ano</label>
        <Select
          value={currentFilters.year || 'all'}
          onValueChange={(value) => updateFilters('year', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Qualquer ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer ano</SelectItem>
            {yearRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Combustível</label>
        <Select
          value={currentFilters.fuel || 'all'}
          onValueChange={(value) => updateFilters('fuel', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {Object.entries(FUEL_TYPES).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Câmbio</label>
        <Select
          value={currentFilters.transmission || 'all'}
          onValueChange={(value) => updateFilters('transmission', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {Object.entries(TRANSMISSION_TYPES).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Limpar filtros ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por marca, modelo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      {/* Desktop Filters */}
      <div className="hidden lg:flex items-center gap-4">
        <Select
          value={currentFilters.brand || 'all'}
          onValueChange={(value) => updateFilters('brand', value)}
        >
          <SelectTrigger className="w-[180px]">
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

        <Select
          value={currentFilters.price || 'all'}
          onValueChange={(value) => updateFilters('price', value)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Preço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer preço</SelectItem>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentFilters.year || 'all'}
          onValueChange={(value) => updateFilters('year', value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer ano</SelectItem>
            {yearRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={currentFilters.transmission || 'all'}
          onValueChange={(value) => updateFilters('transmission', value)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Câmbio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {Object.entries(TRANSMISSION_TYPES).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpar ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
