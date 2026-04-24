'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, X, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { vehicleFormSchema, type VehicleFormData } from '@/lib/validations'
import { BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, STATUS_TYPES } from '@/lib/types'
import type { Vehicle } from '@/lib/types'

interface VehicleFormProps {
  vehicle?: Vehicle
  isEditing?: boolean
}

const commonFeatures = [
  'Ar condicionado digital',
  'Direção elétrica',
  'Vidros elétricos',
  'Travas elétricas',
  'Airbags',
  'ABS',
  'Controle de tração',
  'Controle de estabilidade',
  'Câmera de ré',
  'Sensor de estacionamento',
  'Central multimídia',
  'Bluetooth',
  'Apple CarPlay',
  'Android Auto',
  'Teto solar',
  'Bancos em couro',
  'Bancos com aquecimento',
  'Faróis LED',
  'Rodas de liga leve',
  'Piloto automático',
]

export function VehicleForm({ vehicle, isEditing = false }: VehicleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [features, setFeatures] = useState<string[]>(vehicle?.features || [])
  const [newFeature, setNewFeature] = useState('')
  const router = useRouter()

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      brand: vehicle?.brand || '',
      model: vehicle?.model || '',
      year: vehicle?.year || new Date().getFullYear(),
      price: vehicle?.price || 0,
      mileage: vehicle?.mileage || 0,
      color: vehicle?.color || '',
      transmission: vehicle?.transmission || 'automatic',
      fuel: vehicle?.fuel || 'flex',
      doors: vehicle?.doors || 4,
      engine: vehicle?.engine || '',
      power: vehicle?.power || '',
      features: vehicle?.features || [],
      description: vehicle?.description || '',
      status: vehicle?.status || 'available',
      featured: vehicle?.featured || false,
    },
  })

  const onSubmit = async (data: VehicleFormData) => {
    setIsSubmitting(true)
    
    // Include features in the data
    const vehicleData = { ...data, features }
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    console.log('Vehicle data:', vehicleData)
    setIsSubmitting(false)
    router.push('/admin/veiculos')
  }

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setFeatures(features.filter((f) => f !== feature))
  }

  const addCommonFeature = (feature: string) => {
    if (!features.includes(feature)) {
      setFeatures([...features, feature])
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-lg font-heading font-semibold mb-6">
            Informações Básicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a marca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BRANDS.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 911 Carrera S" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1900}
                      max={new Date().getFullYear() + 1}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cinza Ártico Metálico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço (R$)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quilometragem</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Technical Specs */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-lg font-heading font-semibold mb-6">
            Especificações Técnicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Câmbio</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(TRANSMISSION_TYPES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fuel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Combustível</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(FUEL_TYPES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="doors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portas</FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2">2 portas</SelectItem>
                      <SelectItem value="4">4 portas</SelectItem>
                      <SelectItem value="5">5 portas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="engine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motor</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 3.0 Turbo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="power"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Potência</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 450 cv" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-lg font-heading font-semibold mb-6">
            Equipamentos
          </h2>
          
          {/* Add Feature */}
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Adicionar equipamento..."
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
            />
            <Button type="button" variant="outline" onClick={addFeature}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Current Features */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Common Features */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Clique para adicionar:
            </p>
            <div className="flex flex-wrap gap-2">
              {commonFeatures
                .filter((f) => !features.includes(f))
                .slice(0, 10)
                .map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => addCommonFeature(feature)}
                    className="px-3 py-1 rounded-full border border-border text-sm hover:bg-muted transition-colors"
                  >
                    + {feature}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-lg font-heading font-semibold mb-6">
            Descrição
          </h2>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Descreva o veículo em detalhes..."
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Inclua detalhes sobre o histórico, condição e diferenciais do veículo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-lg font-heading font-semibold mb-6">
            Imagens
          </h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Arraste imagens aqui ou clique para selecionar
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG ou WebP até 10MB
            </p>
            <Button type="button" variant="outline" className="mt-4">
              Selecionar Imagens
            </Button>
          </div>
        </div>

        {/* Status & Settings */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-lg font-heading font-semibold mb-6">
            Status e Configurações
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(STATUS_TYPES).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <FormLabel>Destaque</FormLabel>
                    <FormDescription>
                      Exibir na página inicial
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : isEditing ? (
              'Salvar Alterações'
            ) : (
              'Criar Veículo'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
