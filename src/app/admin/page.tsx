'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuth, useApi, useMutation } from '@/hooks/useApi'
import Loading, { TicketSkeleton, ServiceSkeleton } from '@/components/Loading'
import { 
  Users, 
  Ticket, 
  DollarSign, 
  TrendingUp, 
  Settings,
  FileText,
  MessageSquare,
  Package,
  PlusCircle,
  Edit,
  Trash2,
  Instagram,
  Share2,
  Eye,
  X,
  ExternalLink,
  Check,
  AlertCircle,
  Clock
} from 'lucide-react'

// Carga dinámica de componentes pesados (comentado hasta instalar react-chartjs-2)
// const Chart = dynamic(() => import('react-chartjs-2'), {
//   ssr: false,
//   loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
// })

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

interface Client {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
  notes?: string
  createdAt: string
  _count?: {
    tickets: number
    quotes: number
  }
}

interface TicketData {
  id: string
  title: string
  message?: string
  phone?: string
  priority: string
  status: string
  user: { 
    name: string
    email?: string
  }
  createdAt: string
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: string
  features: string[]
  active: boolean
}

interface Stats {
  totalUsers: number
  totalTickets: number
  openTickets: number
  revenue: number
}

// Componente optimizado para las tarjetas de estadísticas
function StatCard({ icon: Icon, label, value, color, loading }: {
  icon: any
  label: string
  value: number
  color: string
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="glass-card-readable p-6">
        <div className="flex items-center">
          <div className={`h-8 w-8 bg-white/20 rounded animate-pulse`}></div>
          <div className="ml-4 space-y-2">
            <div className="h-4 bg-white/20 rounded w-24 animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card-readable p-6 card-hover">
      <div className="flex items-center">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className="ml-4">
          <p className="text-sm font-medium text-white/90">{label}</p>
          <p className="text-2xl font-semibold text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </div>
  )
}

// Componente mejorado para la tabla de tickets
function TicketsTable({ tickets, loading }: { tickets: TicketData[], loading: boolean }) {
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL')

  const priorityColors = useMemo(() => ({
    'URGENT': 'bg-red-100 text-red-800',
    'HIGH': 'bg-orange-100 text-orange-800',
    'MEDIUM': 'bg-yellow-100 text-yellow-800',
    'LOW': 'bg-green-100 text-green-800'
  }), [])

  const statusColors = useMemo(() => ({
    'OPEN': 'bg-blue-100 text-blue-800',
    'IN_PROGRESS': 'bg-yellow-100 text-yellow-800',
    'RESOLVED': 'bg-green-100 text-green-800',
    'CLOSED': 'bg-gray-100 text-gray-800'
  }), [])

  const statusLabels = {
    'OPEN': 'Abierto',
    'IN_PROGRESS': 'En Progreso',
    'RESOLVED': 'Resuelto',
    'CLOSED': 'Cerrado'
  }

  const priorityLabels = {
    'URGENT': 'Urgente',
    'HIGH': 'Alta',
    'MEDIUM': 'Media',
    'LOW': 'Baja'
  }

  // Filtrar tickets
  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = statusFilter === 'ALL' || ticket.status === statusFilter
    const priorityMatch = priorityFilter === 'ALL' || ticket.priority === priorityFilter
    return statusMatch && priorityMatch
  })

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        window.location.reload() // Recargar para actualizar la lista
      }
    } catch (error) {
      console.error('Error updating ticket status:', error)
    }
  }

  const openTicketDetail = (ticket: TicketData) => {
    setSelectedTicket(ticket)
    setShowDetailModal(true)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <TicketSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Estado:</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="ALL">Todos</option>
              <option value="OPEN">Abierto</option>
              <option value="IN_PROGRESS">En Progreso</option>
              <option value="RESOLVED">Resuelto</option>
              <option value="CLOSED">Cerrado</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Prioridad:</label>
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="ALL">Todas</option>
              <option value="URGENT">Urgente</option>
              <option value="HIGH">Alta</option>
              <option value="MEDIUM">Media</option>
              <option value="LOW">Baja</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Mostrando {filteredTickets.length} de {tickets.length} tickets
          </div>
        </div>
      </div>

      {/* Tabla de tickets */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{ticket.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {ticket.message?.substring(0, 50)}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{ticket.user.name}</div>
                      <div className="text-sm text-gray-500">{ticket.user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                      {priorityLabels[ticket.priority as keyof typeof priorityLabels]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full border-0 ${statusColors[ticket.status as keyof typeof statusColors]}`}
                    >
                      <option value="OPEN">Abierto</option>
                      <option value="IN_PROGRESS">En Progreso</option>
                      <option value="RESOLVED">Resuelto</option>
                      <option value="CLOSED">Cerrado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(ticket.createdAt).toLocaleDateString('es-UY')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openTicketDetail(ticket)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalle del ticket */}
      {showDetailModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Detalle del Ticket #{selectedTicket.id.substring(0, 8)}
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{selectedTicket.title}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{selectedTicket.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                  <p className="text-gray-800">{selectedTicket.user.name}</p>
                  <p className="text-gray-600 text-sm">{selectedTicket.user.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <p className="text-gray-800">{selectedTicket.phone || 'No proporcionado'}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[selectedTicket.priority as keyof typeof priorityColors]}`}>
                    {priorityLabels[selectedTicket.priority as keyof typeof priorityLabels]}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[selectedTicket.status as keyof typeof statusColors]}`}>
                    {statusLabels[selectedTicket.status as keyof typeof statusLabels]}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                  <p className="text-gray-800 text-sm">
                    {new Date(selectedTicket.createdAt).toLocaleDateString('es-UY', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  window.open(`mailto:${selectedTicket.user.email}?subject=Re: ${selectedTicket.title}`, '_blank')
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Responder por Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente principal optimizado
export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading: authLoading, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Estados para gestión de usuarios
  const [showCreateUserModal, setShowCreateUserModal] = useState(false)
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [createUserForm, setCreateUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER'
  })
  const [editUserForm, setEditUserForm] = useState({
    name: '',
    email: '',
    role: 'USER'
  })

  // Estados para gestión de clientes
  const [showCreateClientModal, setShowCreateClientModal] = useState(false)
  const [showEditClientModal, setShowEditClientModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [createClientForm, setCreateClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: ''
  })
  const [editClientForm, setEditClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    notes: ''
  })
  
  // Estados para notificaciones
  const [notification, setNotification] = useState<{
    show: boolean
    type: 'success' | 'error' | 'info'
    title: string
    message: string
  }>({
    show: false,
    type: 'info',
    title: '',
    message: ''
  })

  // APIs optimizadas con hooks personalizados
  const { data: stats, loading: statsLoading } = useApi<Stats>('/api/admin/stats', {
    autoFetch: activeTab === 'dashboard',
    initialData: { totalUsers: 0, totalTickets: 0, openTickets: 0, revenue: 0 }
  })

  const { data: users, loading: usersLoading, refetch: refetchUsers } = useApi<User[]>('/api/admin/users', {
    autoFetch: activeTab === 'users',
    initialData: []
  })

  const { data: tickets, loading: ticketsLoading } = useApi<TicketData[]>('/api/admin/tickets', {
    autoFetch: activeTab === 'tickets',
    initialData: []
  })

  const { data: services, loading: servicesLoading, refetch: refetchServices } = useApi<Service[]>('/api/admin/services', {
    autoFetch: activeTab === 'services',
    initialData: []
  })

  const { data: clients, loading: clientsLoading, refetch: refetchClients } = useApi<Client[]>('/api/admin/clients', {
    autoFetch: activeTab === 'clients',
    initialData: []
  })

  const { mutate: toggleService } = useMutation()
  const { mutate: createUserMutation } = useMutation()
  const { mutate: updateUserMutation } = useMutation()
  const { mutate: deleteUserMutation } = useMutation()
  const { mutate: createClientMutation } = useMutation()
  const { mutate: updateClientMutation } = useMutation()
  const { mutate: deleteClientMutation } = useMutation()

  // Redirect si no es admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push('/login')
    }
  }, [user, isAdmin, authLoading, router])

  // Función optimizada para cambiar estado del servicio
  const handleToggleService = useCallback(async (serviceId: string, currentActive: boolean) => {
    try {
      await toggleService(`/api/admin/services/${serviceId}`, {
        method: 'PATCH',
        body: { active: !currentActive }
      })
      refetchServices()
    } catch (error) {
      console.error('Error updating service:', error)
    }
  }, [toggleService, refetchServices])

  // Función para mostrar notificaciones
  const showNotification = useCallback((type: 'success' | 'error' | 'info', title: string, message: string) => {
    setNotification({ show: true, type, title, message })
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }))
    }, 5000)
  }, [])

  // Funciones para gestión de usuarios
  const handleCreateUser = useCallback(async () => {
    try {
      console.log('Creating user with data:', createUserForm)
      await createUserMutation('/api/admin/users', {
        method: 'POST',
        body: createUserForm
      })
      setShowCreateUserModal(false)
      setCreateUserForm({ name: '', email: '', password: '', role: 'USER' })
      refetchUsers()
      showNotification('success', '¡Usuario creado!', `El usuario ${createUserForm.name} ha sido creado exitosamente.`)
    } catch (error) {
      console.error('Error creating user:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      showNotification('error', 'Error al crear usuario', `No se pudo crear el usuario: ${errorMessage}`)
    }
  }, [createUserMutation, createUserForm, refetchUsers, showNotification])

  const handleEditUser = useCallback(async () => {
    if (!selectedUser) return
    try {
      console.log('Updating user:', selectedUser.id, 'with data:', editUserForm)
      await updateUserMutation(`/api/admin/users/${selectedUser.id}`, {
        method: 'PUT',
        body: editUserForm
      })
      setShowEditUserModal(false)
      setSelectedUser(null)
      setEditUserForm({ name: '', email: '', role: 'USER' })
      refetchUsers()
      showNotification('success', '¡Usuario actualizado!', `Los datos de ${editUserForm.name} han sido actualizados correctamente.`)
    } catch (error) {
      console.error('Error updating user:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      showNotification('error', 'Error al actualizar', `No se pudo actualizar el usuario: ${errorMessage}`)
    }
  }, [updateUserMutation, selectedUser, editUserForm, refetchUsers, showNotification])

  const handleDeleteUser = useCallback(async (userId: string, userName: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar a ${userName}?`)) return
    try {
      console.log('Attempting to delete user:', userId, userName)
      await deleteUserMutation(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })
      console.log('User deleted successfully')
      refetchUsers()
      showNotification('success', '¡Usuario eliminado!', `${userName} ha sido eliminado del sistema.`)
    } catch (error) {
      console.error('Error deleting user:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      showNotification('error', 'Error al eliminar', `No se pudo eliminar el usuario: ${errorMessage}`)
    }
  }, [deleteUserMutation, refetchUsers, showNotification])

  const openEditModal = useCallback((userToEdit: User) => {
    setSelectedUser(userToEdit)
    setEditUserForm({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role
    })
    setShowEditUserModal(true)
  }, [])

  // Funciones para gestión de clientes
  const handleCreateClient = useCallback(async () => {
    try {
      console.log('Creating client with data:', createClientForm)
      await createClientMutation('/api/admin/clients', {
        method: 'POST',
        body: createClientForm
      })
      setShowCreateClientModal(false)
      setCreateClientForm({ name: '', email: '', phone: '', company: '', address: '', notes: '' })
      refetchClients()
      showNotification('success', '¡Cliente creado!', `El cliente ${createClientForm.name} ha sido creado exitosamente.`)
    } catch (error) {
      console.error('Error creating client:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      showNotification('error', 'Error al crear cliente', `No se pudo crear el cliente: ${errorMessage}`)
    }
  }, [createClientMutation, createClientForm, refetchClients, showNotification])

  const handleEditClient = useCallback(async () => {
    if (!editingClient) return
    try {
      console.log('Updating client:', editingClient.id, 'with data:', editClientForm)
      await updateClientMutation(`/api/admin/clients/${editingClient.id}`, {
        method: 'PUT',
        body: editClientForm
      })
      setShowEditClientModal(false)
      setEditingClient(null)
      setEditClientForm({ name: '', email: '', phone: '', company: '', address: '', notes: '' })
      refetchClients()
      showNotification('success', '¡Cliente actualizado!', `Los datos de ${editClientForm.name} han sido actualizados correctamente.`)
    } catch (error) {
      console.error('Error updating client:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      showNotification('error', 'Error al actualizar', `No se pudo actualizar el cliente: ${errorMessage}`)
    }
  }, [updateClientMutation, editingClient, editClientForm, refetchClients, showNotification])

  const handleDeleteClient = useCallback(async (clientId: string) => {
    const client = clients?.find(c => c.id === clientId)
    if (!client) {
      showNotification('error', 'Error', 'Cliente no encontrado')
      return
    }
    
    const confirmMessage = `⚠️ ELIMINACIÓN PERMANENTE ⚠️

¿Estás seguro de que quieres eliminar al cliente "${client.name}"?

Esta acción eliminará PERMANENTEMENTE:
• Toda la información del cliente
• Todos los tickets asociados  
• Todas las cotizaciones asociadas
• Todos los comentarios en tickets
• Todos los testimonios relacionados

❌ Esta acción NO se puede deshacer

¿Continuar con la eliminación?`
    
    if (!confirm(confirmMessage)) return
    
    try {
      console.log('Attempting to delete client:', clientId, client.name)
      
      const response = await deleteClientMutation(`/api/admin/clients/${clientId}`, {
        method: 'DELETE'
      })
      
      console.log('Client deleted successfully:', response)
      refetchClients()
      
      // Mensaje de éxito más informativo
      let successMessage = `${client.name} ha sido eliminado del sistema correctamente.`
      if (response.deletedRelatedData) {
        const { tickets, quotes, testimonials } = response.deletedRelatedData
        const parts = []
        if (tickets > 0) parts.push(`${tickets} ticket${tickets > 1 ? 's' : ''}`)
        if (quotes > 0) parts.push(`${quotes} cotización${quotes > 1 ? 'es' : ''}`)
        if (testimonials > 0) parts.push(`${testimonials} testimonio${testimonials > 1 ? 's' : ''}`)
        
        if (parts.length > 0) {
          successMessage += `\n\nTambién se eliminaron: ${parts.join(', ')}`
        }
      }
      
      showNotification('success', '¡Cliente eliminado!', successMessage)
    } catch (error) {
      console.error('Error deleting client:', error)
      
      // Manejo mejorado de errores
      let errorMessage = 'Error desconocido al eliminar el cliente'
      
      if (error instanceof Error) {
        if (error.message.includes('400')) {
          errorMessage = 'No se puede eliminar el cliente porque tiene datos relacionados que impiden su eliminación'
        } else if (error.message.includes('404')) {
          errorMessage = 'El cliente no fue encontrado'
        } else if (error.message.includes('403')) {
          errorMessage = 'No tienes permisos para eliminar este cliente'
        } else if (error.message.includes('401')) {
          errorMessage = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente'
        } else if (error.message.includes('500')) {
          errorMessage = 'Error interno del servidor. Por favor, intenta nuevamente'
        } else {
          errorMessage = error.message
        }
      }
      
      showNotification('error', 'Error al eliminar cliente', errorMessage)
    }
  }, [deleteClientMutation, clients, refetchClients, showNotification])

  const openEditClientModal = useCallback((clientToEdit: Client) => {
    setEditingClient(clientToEdit)
    setEditClientForm({
      name: clientToEdit.name,
      email: clientToEdit.email,
      phone: clientToEdit.phone || '',
      company: clientToEdit.company || '',
      address: clientToEdit.address || '',
      notes: clientToEdit.notes || ''
    })
    setShowEditClientModal(true)
  }, [])

  // Navegación de tabs optimizada
  const tabs = useMemo(() => [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'users', name: 'Usuarios', icon: Users },
    { id: 'tickets', name: 'Tickets', icon: Ticket },
    { id: 'clients', name: 'Clientes', icon: Users },
    { id: 'services', name: 'Servicios', icon: Package },
    { id: 'social', name: 'Redes Sociales', icon: Share2 },
    { id: 'settings', name: 'Configuración', icon: Settings },
  ], [])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Verificando autenticación" size="lg" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen gradient-animated">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">
                Panel de Administración TechFix
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/90">
                Bienvenido, {user.name}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="btn-modern bg-red-600 hover:bg-red-700 px-4 py-2 text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="glass-card-readable p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {tab.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
                  <div className="text-sm text-gray-600">
                    Última actualización: {new Date().toLocaleDateString('es-UY', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                
                {/* Stats Cards Mejoradas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {statsLoading ? '...' : (stats?.totalUsers || 1)}
                        </p>
                        <p className="text-xs text-green-600">Sistema de usuario único</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Ticket className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {statsLoading ? '...' : (stats?.totalTickets || 0)}
                        </p>
                        <p className="text-xs text-gray-500">Desde el inicio</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <AlertCircle className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Tickets Abiertos</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {statsLoading ? '...' : (stats?.openTickets || 0)}
                        </p>
                        <p className="text-xs text-yellow-600">Requieren atención</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Servicios Activos</p>
                        <p className="text-2xl font-semibold text-gray-900">
                          {statsLoading ? '...' : (services?.filter(s => s.active).length || 0)}
                        </p>
                        <p className="text-xs text-purple-600">Disponibles</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumen de Actividad Reciente */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tickets Recientes</h3>
                    <div className="space-y-3">
                      {ticketsLoading ? (
                        [...Array(3)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        ))
                      ) : (
                        tickets?.slice(0, 5).map((ticket) => (
                          <div key={ticket.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div>
                              <p className="text-sm font-medium text-gray-800 truncate max-w-xs">
                                {ticket.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {ticket.user.name} • {new Date(ticket.createdAt).toLocaleDateString('es-UY')}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
                              ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                              ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {ticket.status === 'OPEN' ? 'Abierto' :
                               ticket.status === 'IN_PROGRESS' ? 'En Progreso' :
                               ticket.status === 'RESOLVED' ? 'Resuelto' : 'Cerrado'}
                            </span>
                          </div>
                        ))
                      )}
                      {tickets && tickets.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No hay tickets aún</p>
                      )}
                    </div>
                    {tickets && tickets.length > 5 && (
                      <div className="mt-4 text-center">
                        <button 
                          onClick={() => setActiveTab('tickets')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Ver todos los tickets →
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Prioridad</h3>
                    <div className="space-y-3">
                      {ticketsLoading ? (
                        [...Array(4)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          </div>
                        ))
                      ) : (
                        ['URGENT', 'HIGH', 'MEDIUM', 'LOW'].map((priority) => {
                          const count = tickets?.filter(t => t.priority === priority).length || 0
                          const total = tickets?.length || 1
                          const percentage = Math.round((count / total) * 100)
                          
                          return (
                            <div key={priority} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  priority === 'URGENT' ? 'bg-red-500' :
                                  priority === 'HIGH' ? 'bg-orange-500' :
                                  priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}></div>
                                <span className="text-sm text-gray-700">
                                  {priority === 'URGENT' ? 'Urgente' :
                                   priority === 'HIGH' ? 'Alta' :
                                   priority === 'MEDIUM' ? 'Media' : 'Baja'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      priority === 'URGENT' ? 'bg-red-500' :
                                      priority === 'HIGH' ? 'bg-orange-500' :
                                      priority === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab('tickets')}
                      className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Ticket className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-blue-700 font-medium">Ver Tickets</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('clients')}
                      className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <Users className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-700 font-medium">Ver Clientes</span>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('services')}
                      className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <Package className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-purple-700 font-medium">Ver Servicios</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Gestión de Tickets</h2>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center transition-colors"
                    onClick={() => {/* Aquí podrías agregar funcionalidad para crear nuevo ticket */}}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Ticket
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow border border-gray-200">
                  <TicketsTable tickets={tickets || []} loading={ticketsLoading} />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Gestión de Servicios</h2>
                  <button
                    onClick={() => router.push('/admin/services/new')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center transition-colors"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Servicio
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  {servicesLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <ServiceSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {services?.map((service) => (
                        <div key={service.id} className="bg-gray-50 rounded-lg shadow p-6 hover:shadow-md transition-shadow border border-gray-200">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleToggleService(service.id, service.active)}
                                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                  service.active 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                {service.active ? 'Activo' : 'Inactivo'}
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4 line-clamp-3">{service.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                              Consultar precio
                            </span>
                            <span className="text-sm text-gray-600">
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Gestión de Clientes</h2>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center transition-colors"
                    onClick={() => setShowCreateClientModal(true)}
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Nuevo Cliente
                  </button>
                </div>

                {clientsLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="glass-card-readable p-4">
                        <div className="animate-pulse flex space-x-4">
                          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {clients?.map((client) => (
                      <div key={client.id} className="glass-card-readable p-4 card-hover">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{client.name}</h3>
                            <p className="text-gray-600 text-sm">{client.email}</p>
                            {client.phone && (
                              <p className="text-gray-600 text-sm">📞 {client.phone}</p>
                            )}
                            {client.company && (
                              <p className="text-gray-600 text-sm">🏢 {client.company}</p>
                            )}
                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                              <span>🎫 {client._count?.tickets || 0} tickets</span>
                              <span>💰 {client._count?.quotes || 0} cotizaciones</span>
                              <span>📅 {new Date(client.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditClientModal(client)}
                              className="text-blue-600 hover:text-blue-800 p-1"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(client.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
                  <div className="bg-blue-500/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Configuración de Usuario Único
                  </h3>
                  <p className="text-gray-600 mb-6">
                    TechFix está configurado para usar un solo usuario administrador para máxima simplicidad y seguridad.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-center mb-4">
                      <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
                      <span className="text-gray-800 font-medium">Usuario Activo</span>
                    </div>
                    {user && (
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">👤 Nombre:</span> {user.name}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">📧 Email:</span> {user.email}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">🔒 Rol:</span> {user.role}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">📅 Desde:</span> {new Date(user.createdAt).toLocaleDateString('es-UY')}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 text-sm text-gray-600">
                    <p className="font-medium text-gray-800 mb-2">💡 Ventajas del sistema de usuario único:</p>
                    <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
                      <li>Mayor seguridad y control total</li>
                      <li>Sin gestión compleja de permisos</li>
                      <li>Todos los tickets centralizados</li>
                      <li>Configuración simplificada</li>
                      <li>Menor superficie de ataque</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Gestión de Redes Sociales</h2>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center transition-colors"
                    onClick={() => {/* Aquí podrías agregar funcionalidad para conectar nueva red social */}}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Conectar Red Social
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Instagram Card */}
                  <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-3 rounded-lg">
                          <Instagram className="h-8 w-8 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">Instagram</h3>
                          <p className="text-sm text-gray-600">Soporte Técnico</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Activo
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Usuario:</span>
                        <span className="text-sm text-gray-800 font-mono">@techfix_soporte_tecnico</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Seguidores:</span>
                        <span className="text-sm text-gray-800">2.1K</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Publicaciones:</span>
                        <span className="text-sm text-gray-800">156</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Última publicación:</span>
                        <span className="text-sm text-gray-800">Hace 2 horas</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-2">
                      <button
                        onClick={() => window.open('https://instagram.com/techfix_soporte_tecnico', '_blank')}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-pink-600 transition-all duration-200 flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Perfil
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp Card */}
                  <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-green-500 p-3 rounded-lg">
                          <MessageSquare className="h-8 w-8 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
                          <p className="text-sm text-gray-600">Contacto Directo</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Activo
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Número:</span>
                        <span className="text-sm text-gray-800 font-mono">+598 99 123 456</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Mensajes hoy:</span>
                        <span className="text-sm text-gray-800">47</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Tiempo respuesta:</span>
                        <span className="text-sm text-green-600 font-semibold">&lt; 5 min</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Estado:</span>
                        <span className="text-sm text-green-600 font-semibold">En línea</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-2">
                      <button
                        onClick={() => window.open('https://wa.me/59899123456', '_blank')}
                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Abrir Chat
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Estadísticas de Redes */}
                  <div className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-500 p-3 rounded-lg">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Estadísticas</h3>
                        <p className="text-sm text-gray-600">Último mes</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Instagram</span>
                          <span className="text-sm text-green-600 font-semibold">+12%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Nuevos seguidores</span>
                          <span className="text-lg font-bold text-purple-600">247</span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">WhatsApp</span>
                          <span className="text-sm text-green-600 font-semibold">+8%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Consultas resueltas</span>
                          <span className="text-lg font-bold text-green-600">1,234</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Engagement</span>
                          <span className="text-sm text-green-600 font-semibold">+15%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Interacciones totales</span>
                          <span className="text-lg font-bold text-blue-600">3.7K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 flex items-center justify-center">
                      <Instagram className="h-5 w-5 mr-2" />
                      Publicar en Instagram
                    </button>
                    <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Mensaje masivo WhatsApp
                    </button>
                    <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Ver Analytics
                    </button>
                    <button className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Configurar APIs
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Configuración del Sistema</h2>
                  <div className="text-sm text-gray-600">
                    TechFix v2.0 - Sistema de usuario único
                  </div>
                </div>

                {/* Información del Negocio */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-600" />
                    Información del Negocio
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Negocio</label>
                      <input
                        type="text"
                        defaultValue="TechFix - Soporte Técnico"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre de tu negocio"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono Principal</label>
                      <input
                        type="tel"
                        defaultValue="+598 99 123 456"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+598 99 123 456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email del Negocio</label>
                      <input
                        type="email"
                        defaultValue="techfixuruguay@gmail.com"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="contacto@tunegocio.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                      <input
                        type="text"
                        defaultValue="Montevideo, Uruguay"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tu dirección comercial"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción del Negocio</label>
                    <textarea
                      rows={3}
                      defaultValue="Servicios de reparación y mantenimiento técnico especializado. Soluciones rápidas y confiables para todos tus dispositivos."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe tu negocio..."
                    />
                  </div>
                </div>

                {/* Horarios de Atención */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-green-600" />
                    Horarios de Atención
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { day: 'Lunes', open: '09:00', close: '18:00' },
                      { day: 'Martes', open: '09:00', close: '18:00' },
                      { day: 'Miércoles', open: '09:00', close: '18:00' },
                      { day: 'Jueves', open: '09:00', close: '18:00' },
                      { day: 'Viernes', open: '09:00', close: '18:00' },
                      { day: 'Sábado', open: '10:00', close: '14:00' },
                      { day: 'Domingo', open: 'Cerrado', close: '' }
                    ].map((schedule) => (
                      <div key={schedule.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-700">{schedule.day}</span>
                        <div className="flex items-center space-x-2">
                          {schedule.day === 'Domingo' ? (
                            <span className="text-red-600 font-medium">Cerrado</span>
                          ) : (
                            <>
                              <input
                                type="time"
                                defaultValue={schedule.open}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                              />
                              <span className="text-gray-500">-</span>
                              <input
                                type="time"
                                defaultValue={schedule.close}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                              />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Configuración de Notificaciones */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                    Configuración de Notificaciones
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">Nuevos Tickets</h4>
                        <p className="text-sm text-gray-600">Recibir notificación cuando llegue un nuevo ticket</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">Tickets Urgentes</h4>
                        <p className="text-sm text-gray-600">Notificación especial para tickets con prioridad urgente</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">Resumen Diario</h4>
                        <p className="text-sm text-gray-600">Recibir un resumen diario de actividad a las 18:00</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Sistema de Respaldo */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-indigo-600" />
                    Sistema de Respaldo y Exportación
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <FileText className="h-8 w-8 text-blue-600 mb-2" />
                      <span className="font-medium text-blue-700">Exportar Tickets</span>
                      <span className="text-sm text-blue-600">Descargar CSV</span>
                    </button>
                    
                    <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <Users className="h-8 w-8 text-green-600 mb-2" />
                      <span className="font-medium text-green-700">Exportar Clientes</span>
                      <span className="text-sm text-green-600">Descargar CSV</span>
                    </button>
                    
                    <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <Package className="h-8 w-8 text-purple-600 mb-2" />
                      <span className="font-medium text-purple-700">Backup Completo</span>
                      <span className="text-sm text-purple-600">Todas las tablas</span>
                    </button>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Último respaldo:</strong> 12 de agosto, 2025 - 14:30
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Próximo respaldo automático:</strong> 13 de agosto, 2025 - 02:00
                    </p>
                  </div>
                </div>

                {/* Información del Sistema */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-gray-600" />
                    Información del Sistema
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Versión:</span>
                        <span className="font-medium">TechFix v2.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base de datos:</span>
                        <span className="font-medium">PostgreSQL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Framework:</span>
                        <span className="font-medium">Next.js 15.4.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deployment:</span>
                        <span className="font-medium">Vercel</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiempo activo:</span>
                        <span className="font-medium text-green-600">99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Último error:</span>
                        <span className="font-medium">Ninguno</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Modo:</span>
                        <span className="font-medium text-blue-600">Usuario único</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Región:</span>
                        <span className="font-medium">South America</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de Guardado */}
                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    Guardar Configuración
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para crear cliente */}
      {showCreateClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="glass-card-readable max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-500/20 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-green-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">✨ Crear Nuevo Cliente</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">👤 Nombre completo</label>
                <input
                  type="text"
                  value={createClientForm.name}
                  onChange={(e) => setCreateClientForm({...createClientForm, name: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre del cliente"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">📧 Email</label>
                <input
                  type="email"
                  value={createClientForm.email}
                  onChange={(e) => setCreateClientForm({...createClientForm, email: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">📞 Teléfono</label>
                <input
                  type="tel"
                  value={createClientForm.phone}
                  onChange={(e) => setCreateClientForm({...createClientForm, phone: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Número de teléfono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">🏢 Empresa</label>
                <input
                  type="text"
                  value={createClientForm.company}
                  onChange={(e) => setCreateClientForm({...createClientForm, company: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre de la empresa (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">📍 Dirección</label>
                <input
                  type="text"
                  value={createClientForm.address}
                  onChange={(e) => setCreateClientForm({...createClientForm, address: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Dirección (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">📝 Notas</label>
                <textarea
                  value={createClientForm.notes}
                  onChange={(e) => setCreateClientForm({...createClientForm, notes: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Notas adicionales (opcional)"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateClientModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateClient}
                disabled={!createClientForm.name || !createClientForm.email}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                ✨ Crear Cliente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar cliente */}
      {showEditClientModal && editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="glass-card-readable max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                <Edit className="h-6 w-6 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">✏️ Editar Cliente</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">👤 Nombre completo</label>
                <input
                  type="text"
                  value={editClientForm.name}
                  onChange={(e) => setEditClientForm({...editClientForm, name: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del cliente"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">📧 Email</label>
                <input
                  type="email"
                  value={editClientForm.email}
                  onChange={(e) => setEditClientForm({...editClientForm, email: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">📞 Teléfono</label>
                <input
                  type="tel"
                  value={editClientForm.phone}
                  onChange={(e) => setEditClientForm({...editClientForm, phone: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Número de teléfono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">🏢 Empresa</label>
                <input
                  type="text"
                  value={editClientForm.company}
                  onChange={(e) => setEditClientForm({...editClientForm, company: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre de la empresa (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">📍 Dirección</label>
                <input
                  type="text"
                  value={editClientForm.address}
                  onChange={(e) => setEditClientForm({...editClientForm, address: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dirección (opcional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">📝 Notas</label>
                <textarea
                  value={editClientForm.notes}
                  onChange={(e) => setEditClientForm({...editClientForm, notes: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Notas adicionales (opcional)"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditClientModal(false)}
                className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditClient}
                disabled={!editClientForm.name || !editClientForm.email}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                💾 Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para crear usuario */}
      {showCreateUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="glass-card-readable max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                <Users className="h-6 w-6 text-blue-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">✨ Crear Nuevo Usuario</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">👤 Nombre completo</label>
                <input
                  type="text"
                  value={createUserForm.name}
                  onChange={(e) => setCreateUserForm({...createUserForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Juan Pérez"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">📧 Email</label>
                <input
                  type="email"
                  value={createUserForm.email}
                  onChange={(e) => setCreateUserForm({...createUserForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="juan@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">🔑 Contraseña</label>
                <input
                  type="password"
                  value={createUserForm.password}
                  onChange={(e) => setCreateUserForm({...createUserForm, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">👑 Rol</label>
                <select
                  value={createUserForm.role}
                  onChange={(e) => setCreateUserForm({...createUserForm, role: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="USER" className="bg-gray-800">👤 Usuario</option>
                  <option value="AGENT" className="bg-gray-800">🎧 Agente</option>
                  <option value="ADMIN" className="bg-gray-800">👑 Administrador</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="flex-1 px-4 py-3 bg-gray-500/20 backdrop-blur-lg border border-gray-500/30 text-white rounded-lg hover:bg-gray-500/30 transition-all"
              >
                ❌ Cancelar
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 px-4 py-3 bg-blue-600/80 backdrop-blur-lg border border-blue-500/30 text-white rounded-lg hover:bg-blue-600 transition-all pulse-modern"
              >
                ✨ Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar usuario */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="glass-card-readable max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-orange-500/20 p-3 rounded-full mr-4">
                <Edit className="h-6 w-6 text-orange-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">🔧 Editar Usuario</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">👤 Nombre completo</label>
                <input
                  type="text"
                  value={editUserForm.name}
                  onChange={(e) => setEditUserForm({...editUserForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">📧 Email</label>
                <input
                  type="email"
                  value={editUserForm.email}
                  onChange={(e) => setEditUserForm({...editUserForm, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">👑 Rol</label>
                <select
                  value={editUserForm.role}
                  onChange={(e) => setEditUserForm({...editUserForm, role: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                >
                  <option value="USER" className="bg-gray-800">👤 Usuario</option>
                  <option value="AGENT" className="bg-gray-800">🎧 Agente</option>
                  <option value="ADMIN" className="bg-gray-800">👑 Administrador</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditUserModal(false)}
                className="flex-1 px-4 py-3 bg-gray-500/20 backdrop-blur-lg border border-gray-500/30 text-white rounded-lg hover:bg-gray-500/30 transition-all"
              >
                ❌ Cancelar
              </button>
              <button
                onClick={handleEditUser}
                className="flex-1 px-4 py-3 bg-orange-600/80 backdrop-blur-lg border border-orange-500/30 text-white rounded-lg hover:bg-orange-600 transition-all pulse-modern"
              >
                💾 Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notificación bonita */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className={`glass-card-readable p-4 max-w-sm shadow-2xl border-l-4 ${
            notification.type === 'success' ? 'border-green-500' :
            notification.type === 'error' ? 'border-red-500' :
            'border-blue-500'
          }`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 mr-3 ${
                notification.type === 'success' ? 'text-green-400' :
                notification.type === 'error' ? 'text-red-400' :
                'text-blue-400'
              }`}>
                {notification.type === 'success' && <Check className="h-6 w-6" />}
                {notification.type === 'error' && <X className="h-6 w-6" />}
                {notification.type === 'info' && <AlertCircle className="h-6 w-6" />}
              </div>
              <div>
                <h4 className="text-white font-semibold">{notification.title}</h4>
                <p className="text-white/80 text-sm mt-1">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(prev => ({ ...prev, show: false }))}
                className="ml-3 text-white/60 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
