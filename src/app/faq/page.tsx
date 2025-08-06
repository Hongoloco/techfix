'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Ticket, ArrowLeft, ChevronDown, ChevronUp, Search } from 'lucide-react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string | null
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/faq')
      const data = await response.json()
      setFaqs(data.faqs || [])
      
      // Extraer categorías únicas
      const uniqueCategories = [...new Set(data.faqs?.map((faq: FAQ) => faq.category).filter(Boolean))] as string[]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFAQ = (id: string) => {
    const newOpenFAQs = new Set(openFAQs)
    if (newOpenFAQs.has(id)) {
      newOpenFAQs.delete(id)
    } else {
      newOpenFAQs.add(id)
    }
    setOpenFAQs(newOpenFAQs)
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">TechFix Support</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Crear Ticket</Link>
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600">
            Encuentra respuestas rápidas a las preguntas más comunes
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando preguntas frecuentes...</p>
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No se encontraron preguntas que coincidan con tu búsqueda.' 
                  : 'No hay preguntas frecuentes disponibles en este momento.'
                }
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Crear Ticket de Soporte
              </Link>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    {faq.category && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {faq.category}
                      </span>
                    )}
                  </div>
                  {openFAQs.has(faq.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openFAQs.has(faq.id) && (
                  <div className="px-6 pb-4">
                    <div className="prose max-w-none text-gray-700">
                      {faq.answer.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-2">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encontraste lo que buscas?
          </h3>
          <p className="text-gray-600 mb-6">
            Nuestro equipo de soporte está listo para ayudarte con cualquier problema específico.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Crear Ticket de Soporte
          </Link>
        </div>
      </main>
    </div>
  )
}
