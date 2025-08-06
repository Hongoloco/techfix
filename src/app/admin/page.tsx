'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
  Trash2
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

interface Ticket {
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

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState<User[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTickets: 0,
    openTickets: 0,
    revenue: 0
  })
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        localStorage.removeItem('token')
        router.push('/login')
        return
      }

      const userData = await response.json()
      setUser(userData)
      
      if (userData.role !== 'ADMIN') {
        router.push('/')
        return
      }
    } catch {
      localStorage.removeItem('token')
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    checkAuth()
    if (activeTab === 'dashboard') {
      loadDashboardData()
    } else if (activeTab === 'users') {
      loadUsers()
    } else if (activeTab === 'tickets') {
      loadTickets()
    } else if (activeTab === 'services') {
      loadServices()
    }
  }, [activeTab, checkAuth])

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const loadTickets = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/tickets', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setTickets(data)
      }
    } catch (error) {
      console.error('Error loading tickets:', error)
    }
  }

  const loadServices = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/services', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error('Error loading services:', error)
    }
  }

  const deleteUser = async (userId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.ok) {
        loadUsers()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const toggleServiceStatus = async (serviceId: string, active: boolean) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/services/${serviceId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ active: !active })
      })

      if (response.ok) {
        loadServices()
      }
    } catch (error) {
      console.error('Error updating service:', error)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Panel de Administración TechFix
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {user.name}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  router.push('/')
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
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
            <nav className="bg-white rounded-lg shadow p-4">
              <ul className="space-y-2">
                {[
                  { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
                  { id: 'users', name: 'Usuarios', icon: Users },
                  { id: 'tickets', name: 'Tickets', icon: Ticket },
                  { id: 'services', name: 'Servicios', icon: Package },
                  { id: 'blog', name: 'Blog', icon: FileText },
                  { id: 'settings', name: 'Configuración', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-left rounded-md ${
                          activeTab === item.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.name}
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
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <Ticket className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.totalTickets}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <MessageSquare className="h-8 w-8 text-yellow-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Tickets Abiertos</p>
                        <p className="text-2xl font-semibold text-gray-900">{stats.openTickets}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                      <DollarSign className="h-8 w-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Ingresos del Mes</p>
                        <p className="text-2xl font-semibold text-gray-900">${stats.revenue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rol
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha de Registro
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                              user.role === 'AGENT' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-900 ml-4"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'tickets' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Gestión de Tickets</h2>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prioridad
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ticket.user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              ticket.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                              ticket.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                              ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
                              ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                              ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Gestión de Servicios</h2>
                  <button
                    onClick={() => router.push('/admin/services/new')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Servicio
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg shadow p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/admin/services/${service.id}/edit`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleServiceStatus(service.id, service.active)}
                            className={`px-2 py-1 text-xs rounded-full ${
                              service.active 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {service.active ? 'Activo' : 'Inactivo'}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">
                          ${service.price}
                        </span>
                        <span className="text-sm text-gray-500">
                          {service.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
