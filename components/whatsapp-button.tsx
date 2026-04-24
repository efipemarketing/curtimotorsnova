'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  message?: string
  vehicleName?: string
}

export function WhatsAppButton({ message, vehicleName }: WhatsAppButtonProps) {
  const defaultMessage = vehicleName
    ? `Olá! Tenho interesse no veículo: ${vehicleName}. Gostaria de mais informações.`
    : 'Olá! Gostaria de mais informações sobre os veículos.'

  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message || defaultMessage)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <motion.span
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.a>
  )
}
