'use client'

import { useState, useEffect } from 'react'
import { Clock, MapPin, PhoneCall, AlertCircle } from 'lucide-react'
import { isBusinessOpen, getBusinessStatus, getAfterHoursMessage, getBusinessInfo } from '@/lib/business'

export function BusinessStatus() {
  const [status, setStatus] = useState<{
    isOpen: boolean
    message: string
    nextOpenTime?: string
  } | null>(null)

  useEffect(() => {
    const updateStatus = () => {
      setStatus(getBusinessStatus())
    }

    updateStatus()
    // Actualizar cada minuto
    const interval = setInterval(updateStatus, 60000)

    return () => clearInterval(interval)
  }, [])

  if (!status) return null

  return (
    <div className={`p-4 rounded-lg border ${
      status.isOpen 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center space-x-2">
        <Clock className={`h-5 w-5 ${
          status.isOpen ? 'text-green-600' : 'text-red-600'
        }`} />
        <span className={`font-medium ${
          status.isOpen ? 'text-green-900' : 'text-red-900'
        }`}>
          {status.message}
        </span>
      </div>
    </div>
  )
}

export function BusinessHours() {
  const businessInfo = getBusinessInfo()

  return (
    <div className="space-y-4">
      <BusinessStatus />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Horarios de atención</p>
            <p className="text-gray-600">{businessInfo.hours}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Visitas técnicas gratuitas</p>
            <p className="text-gray-600">{businessInfo.freeVisitArea}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AfterHoursModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="h-6 w-6 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Estamos cerrados
          </h3>
        </div>
        
        <div className="whitespace-pre-line text-gray-600 mb-6">
          {getAfterHoursMessage()}
        </div>
        
        <div className="flex flex-col space-y-3">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Entendido
          </button>
          <button
            onClick={() => {
              window.open(`https://wa.me/59899252808?text=${encodeURIComponent('Hola TechFix, necesito soporte técnico fuera del horario de atención.')}`, '_blank')
              onClose()
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
          >
            <PhoneCall className="mr-2 h-4 w-4" />
            Enviar WhatsApp de emergencia
          </button>
        </div>
      </div>
    </div>
  )
}

export function useBusinessHours() {
  const [isOpen, setIsOpen] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const checkHours = () => {
      const businessOpen = isBusinessOpen()
      setIsOpen(businessOpen)
      
      // Si es la primera vez que carga la página y está cerrado, mostrar modal
      if (!businessOpen && !sessionStorage.getItem('closedModalShown')) {
        setShowModal(true)
        sessionStorage.setItem('closedModalShown', 'true')
      }
    }

    checkHours()
    const interval = setInterval(checkHours, 60000) // Verificar cada minuto

    return () => clearInterval(interval)
  }, [])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return {
    isOpen,
    showModal,
    handleCloseModal
  }
}
