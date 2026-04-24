import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  vehicleId: z.string().optional(),
})

export const testDriveFormSchema = z.object({
  customerName: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  customerEmail: z.string().email('Email inválido'),
  customerPhone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  vehicleId: z.string().min(1, 'Selecione um veículo'),
  date: z.date({ required_error: 'Selecione uma data' }),
  time: z.string().min(1, 'Selecione um horário'),
  message: z.string().optional(),
})

export const vehicleFormSchema = z.object({
  brand: z.string().min(1, 'Selecione uma marca'),
  model: z.string().min(1, 'Modelo é obrigatório'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().min(0, 'Preço deve ser positivo'),
  mileage: z.number().min(0, 'Quilometragem deve ser positiva'),
  color: z.string().min(1, 'Cor é obrigatória'),
  transmission: z.enum(['manual', 'automatic']),
  fuel: z.enum(['gasoline', 'ethanol', 'flex', 'diesel', 'electric', 'hybrid']),
  doors: z.number().min(2).max(5),
  engine: z.string().min(1, 'Motor é obrigatório'),
  power: z.string().min(1, 'Potência é obrigatória'),
  features: z.array(z.string()),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  status: z.enum(['available', 'reserved', 'sold']),
  featured: z.boolean(),
})

export const loginFormSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type TestDriveFormData = z.infer<typeof testDriveFormSchema>
export type VehicleFormData = z.infer<typeof vehicleFormSchema>
export type LoginFormData = z.infer<typeof loginFormSchema>
