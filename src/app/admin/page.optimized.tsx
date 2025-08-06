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
  ExternalLink
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

interface TicketData {
  id: string
  title: string
  priority: string
  status: string
  user: { name: string }
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
      <div className="bg-gray-50 p-6 rounded-lg shadow animate-pulse border border-gray-200">
        <div className="flex items-center">
          <div className={`h-8 w-8 bg-gray-300 rounded`}></div>
          <div className="ml-4 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <div className="flex items-center">
        <Icon className={`h-8 w-8 ${color}`} />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-2xl font-semibold text-gray-800">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
      </div>
    </div>
  )
}

// Componente optimizado para la tabla de tickets
function TicketsTable({ tickets, loading }: { tickets: TicketData[], loading: boolean }) {
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
    <div className="bg-gray-50 rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Ticket
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Usuario
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
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-300">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-800">{ticket.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {ticket.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[ticket.priority as keyof typeof priorityColors]}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[ticket.status as keyof typeof statusColors]}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(ticket.createdAt).toLocaleDateString('es-UY')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Componente principal optimizado
export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading: authLoading, isAdmin } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  // APIs optimizadas con hooks personalizados
  const { data: stats, loading: statsLoading } = useApi<Stats>('/api/admin/stats', {
    autoFetch: activeTab === 'dashboard',
    initialData: { totalUsers: 0, totalTickets: 0, openTickets: 0, revenue: 0 }
  })

  const { data: users, loading: usersLoading } = useApi<User[]>('/api/admin/users', {
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

  const { mutate: toggleService } = useMutation()

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

  // Navegación de tabs optimizada
  const tabs = useMemo(() => [
    { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
    { id: 'users', name: 'Usuarios', icon: Users },
    { id: 'tickets', name: 'Tickets', icon: Ticket },
    { id: 'services', name: 'Servicios', icon: Package },
    { id: 'social', name: 'Redes Sociales', icon: Share2 },
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-50 shadow-sm border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Panel de Administración TechFix
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Bienvenido, {user.name}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  localStorage.removeItem('user')
                  router.push('/')
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
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
            <nav className="bg-gray-50 rounded-lg shadow p-4 border border-gray-200">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800'
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
              <div>
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <StatCard 
                    icon={Users} 
                    label="Total Usuarios" 
                    value={stats?.totalUsers || 0}
                    color="text-blue-600"
                    loading={statsLoading}
                  />
                  <StatCard 
                    icon={Ticket} 
                    label="Total Tickets" 
                    value={stats?.totalTickets || 0}
                    color="text-green-600"
                    loading={statsLoading}
                  />
                  <StatCard 
                    icon={MessageSquare} 
                    label="Tickets Abiertos" 
                    value={stats?.openTickets || 0}
                    color="text-yellow-600"
                    loading={statsLoading}
                  />
                  <StatCard 
                    icon={DollarSign} 
                    label="Ingresos" 
                    value={stats?.revenue || 0}
                    color="text-purple-600"
                    loading={statsLoading}
                  />
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Gestión de Tickets</h2>
                <TicketsTable tickets={tickets || []} loading={ticketsLoading} />
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Gestión de Servicios</h2>
                  <button
                    onClick={() => router.push('/admin/services/new')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center transition-colors"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Servicio
                  </button>
                </div>
                
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
                          <span className="text-2xl font-bold text-blue-600">
                            ${service.price.toLocaleString()}
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
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Gestión de Usuarios</h2>
                {usersLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg shadow animate-pulse border border-gray-200">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg shadow overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Usuario
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Rol
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Fecha de Registro
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-50 divide-y divide-gray-300">
                        {users?.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-800">{user.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                                user.role === 'AGENT' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(user.createdAt).toLocaleDateString('es-UY')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'social' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Gestión de Redes Sociales</h2>
                
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

                {/* Acciones Rápidas */}
                <div className="mt-8">
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
          </div>
        </div>
      </div>
    </div>
  )
}
