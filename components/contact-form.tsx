'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { contactFormSchema, type ContactFormData } from '@/lib/validations'

interface ContactFormProps {
  vehicleId?: string
  vehicleName?: string
}

export function ContactForm({ vehicleId, vehicleName }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: vehicleName ? `Interesse no ${vehicleName}` : '',
      message: vehicleName
        ? `Olá! Tenho interesse no veículo ${vehicleName}. Gostaria de mais informações.`
        : '',
      vehicleId: vehicleId || '',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    console.log('Contact form submitted:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
    
    setTimeout(() => {
      setIsSuccess(false)
      form.reset()
    }, 3000)
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-lg font-heading font-semibold mb-2">
          Mensagem Enviada!
        </h3>
        <p className="text-muted-foreground">
          Entraremos em contato em breve.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
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
            name="email"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
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

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assunto</FormLabel>
                <FormControl>
                  <Input placeholder="Como podemos ajudar?" {...field} />
                </FormControl>
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
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva sua mensagem aqui..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar Mensagem'
          )}
        </Button>
      </form>
    </Form>
  )
}
