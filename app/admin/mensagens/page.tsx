'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Check,
  Archive,
  Trash2,
  Search,
  Filter,
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
import { Badge } from '@/components/ui/badge'
import { mockMessages } from '@/lib/mock-data'
import type { ContactMessage } from '@/lib/types'

const statusColors = {
  unread: 'bg-primary/20 text-primary',
  read: 'bg-muted text-muted-foreground',
  replied: 'bg-green-500/20 text-green-500',
  archived: 'bg-gray-500/20 text-gray-500',
}

const statusLabels = {
  unread: 'Não Lida',
  read: 'Lida',
  replied: 'Respondida',
  archived: 'Arquivada',
}

export default function MensagensPage() {
  const [messages] = useState<ContactMessage[]>(mockMessages)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || message.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleMarkAsRead = (id: string) => {
    console.log('[v0] Marcando como lida:', id)
  }

  const handleArchive = (id: string) => {
    console.log('[v0] Arquivando:', id)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground">
          Mensagens
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as mensagens recebidas pelo formulário de contato
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou assunto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="unread">Não Lidas</SelectItem>
              <SelectItem value="read">Lidas</SelectItem>
              <SelectItem value="replied">Respondidas</SelectItem>
              <SelectItem value="archived">Arquivadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-card rounded-xl border p-4 cursor-pointer transition-all hover:border-primary ${
                selectedMessage?.id === message.id ? 'border-primary ring-1 ring-primary' : 'border-border'
              } ${message.status === 'unread' ? 'bg-primary/5' : ''}`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{message.name}</h3>
                    <Badge className={statusColors[message.status]} variant="secondary">
                      {statusLabels[message.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                  <p className="text-sm font-medium mt-2 truncate">{message.subject}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {message.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {format(message.createdAt, "dd 'de' MMM, HH:mm", { locale: ptBR })}
                </span>
                <div className="flex gap-1">
                  {message.status === 'unread' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMarkAsRead(message.id)
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleArchive(message.id)
                    }}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-muted-foreground bg-card rounded-xl border">
              Nenhuma mensagem encontrada.
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:sticky lg:top-8 h-fit">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(selectedMessage.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <Badge className={statusColors[selectedMessage.status]}>
                  {statusLabels[selectedMessage.status]}
                </Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone</p>
                      <a 
                        href={`tel:${selectedMessage.phone}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {selectedMessage.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span className="font-medium">Mensagem</span>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex gap-2 mt-6 pt-6 border-t">
                <Button className="flex-1" asChild>
                  <a href={`mailto:${selectedMessage.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Responder
                  </a>
                </Button>
                <Button variant="outline">
                  <Archive className="h-4 w-4 mr-2" />
                  Arquivar
                </Button>
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Selecione uma mensagem para ver os detalhes
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
