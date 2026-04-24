'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, addDays, isWeekend, isBefore, startOfToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { testDriveFormSchema, type TestDriveFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'

interface TestDriveFormProps {
  vehicleId: string
  vehicleName: string
}

const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

export function TestDriveForm({ vehicleId, vehicleName }: TestDriveFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<TestDriveFormData>({
    resolver: zodResolver(testDriveFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      vehicleId: vehicleId,
      time: '',
      message: '',
    },
  })

  const onSubmit = async (data: TestDriveFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    console.log('Test drive scheduled:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const disabledDays = (date: Date) => {
    const today = startOfToday()
    return isBefore(date, today) || isWeekend(date)
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-heading font-bold mb-4">
          Agendamento Confirmado!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-2">
          Seu test-drive do <span className="font-semibold">{vehicleName}</span> foi agendado com sucesso.
        </p>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Você receberá um e-mail de confirmação em breve com todos os detalhes.
        </p>
        <div className="p-4 rounded-lg bg-muted inline-block">
          <p className="text-sm text-muted-foreground">Data e horário:</p>
          <p className="font-semibold">
            {form.getValues('date') && format(form.getValues('date'), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            {' às '}
            {form.getValues('time')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="(11) 99999-9999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data do Test-Drive</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={disabledDays}
                      initialFocus
                      fromDate={new Date()}
                      toDate={addDays(new Date(), 30)}
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Alguma informação adicional que gostaria de compartilhar?"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Veículo selecionado:</strong> {vehicleName}
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Agendando...
            </>
          ) : (
            'Confirmar Agendamento'
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Ao agendar, você concorda com nossa política de privacidade e termos de uso.
          Entraremos em contato para confirmar o agendamento.
        </p>
      </form>
    </Form>
  )
}
