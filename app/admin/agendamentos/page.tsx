'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Car,
  Check,
  X,
  Eye,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { mockSchedulings } from '@/lib/mock-data'
import type { Scheduling } from '@/lib/types'

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-500',
  confirmed: 'bg-blue-500/20 text-blue-500',
  completed: 'bg-green-500/20 text-green-500',
  cancelled: 'bg-red-500/20 text-red-500',
}

const statusLabels = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  completed: 'Concluído',
  cancelled: 'Cancelado',
}

export default function AgendamentosPage() {
  const [schedulings] = useState<Scheduling[]>(mockSchedulings)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedScheduling, setSelectedScheduling] = useState<Scheduling | null>(null)

  const filteredSchedulings = schedulings.filter((scheduling) => {
    const matchesSearch =
      scheduling.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheduling.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheduling.customerPhone.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'all' || scheduling.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (id: string, newStatus: Scheduling['status']) => {
    // In production, update Firestore
    console.log('[v0] Atualizando status:', id, newStatus)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground">
          Agendamentos
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie os agendamentos de test-drive
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
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
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="confirmed">Confirmados</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl border border-border overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Veículo</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedulings.map((scheduling) => (
              <TableRow key={scheduling.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{scheduling.customerName}</p>
                    <p className="text-sm text-muted-foreground">{scheduling.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Veículo #{scheduling.vehicleId.slice(0, 8)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(scheduling.preferredDate, "dd 'de' MMM, yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{scheduling.preferredTime}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[scheduling.status]}>
                    {statusLabels[scheduling.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedScheduling(scheduling)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {scheduling.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-500 hover:text-green-600"
                          onClick={() => handleStatusChange(scheduling.id, 'confirmed')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleStatusChange(scheduling.id, 'cancelled')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredSchedulings.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Nenhum agendamento encontrado.
          </div>
        )}
      </motion.div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedScheduling} onOpenChange={() => setSelectedScheduling(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
            <DialogDescription>
              Informações completas do agendamento
            </DialogDescription>
          </DialogHeader>

          {selectedScheduling && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{selectedScheduling.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedScheduling.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{selectedScheduling.customerPhone}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Data Preferida</p>
                    <p className="font-medium">
                      {format(selectedScheduling.preferredDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Horário Preferido</p>
                    <p className="font-medium">{selectedScheduling.preferredTime}</p>
                  </div>
                </div>
              </div>

              {selectedScheduling.message && (
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Mensagem</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {selectedScheduling.message}
                  </p>
                </div>
              )}

              <div className="border-t pt-4 flex justify-between items-center">
                <Badge className={statusColors[selectedScheduling.status]}>
                  {statusLabels[selectedScheduling.status]}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Criado em {format(selectedScheduling.createdAt, "dd/MM/yyyy 'às' HH:mm")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
