'use client';

import { useState, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  TicketIcon, 
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface SupportTicket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  lastUpdate: string;
  messages: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Problema con integrazione API',
    status: 'in_progress',
    priority: 'high',
    category: 'Tecnico',
    createdAt: '2024-01-15T10:30:00Z',
    lastUpdate: '2024-01-15T14:22:00Z',
    messages: 3
  },
  {
    id: 'TKT-002',
    subject: 'Richiesta aumento limiti transazioni',
    status: 'open',
    priority: 'medium',
    category: 'Account',
    createdAt: '2024-01-14T09:15:00Z',
    lastUpdate: '2024-01-14T09:15:00Z',
    messages: 1
  },
  {
    id: 'TKT-003',
    subject: 'Domanda su commissioni',
    status: 'resolved',
    priority: 'low',
    category: 'Fatturazione',
    createdAt: '2024-01-12T16:45:00Z',
    lastUpdate: '2024-01-13T11:20:00Z',
    messages: 5
  }
];

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Come posso integrare BoomFi nel mio sito web?',
    answer: 'Puoi integrare BoomFi utilizzando le nostre API REST o i nostri SDK disponibili per JavaScript, PHP, Python e altri linguaggi. Consulta la nostra documentazione per guide dettagliate.',
    category: 'Integrazione',
    helpful: 45
  },
  {
    id: '2',
    question: 'Quali sono le commissioni applicate?',
    answer: 'Le commissioni variano in base al piano scelto e al volume di transazioni. Il piano Basic ha una commissione del 2.9% + €0.30 per transazione, mentre i piani superiori offrono tariffe ridotte.',
    category: 'Fatturazione',
    helpful: 32
  },
  {
    id: '3',
    question: 'Come posso configurare i webhook?',
    answer: 'I webhook possono essere configurati nella sezione Impostazioni > Pagamenti. Inserisci l\'URL del tuo endpoint e seleziona gli eventi per cui vuoi ricevere notifiche.',
    category: 'Tecnico',
    helpful: 28
  },
  {
    id: '4',
    question: 'Quanto tempo ci vuole per ricevere i pagamenti?',
    answer: 'I tempi di accredito dipendono dal metodo di pagamento e dalla tua banca. Generalmente, i pagamenti con carta vengono accreditati entro 1-2 giorni lavorativi.',
    category: 'Pagamenti',
    helpful: 51
  }
];

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  open: 'Aperto',
  in_progress: 'In Corso',
  resolved: 'Risolto',
  closed: 'Chiuso'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const priorityLabels = {
  low: 'Bassa',
  medium: 'Media',
  high: 'Alta',
  urgent: 'Urgente'
};

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTickets(mockTickets);
      setFAQs(mockFAQs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Centro Assistenza</h1>
          <p className="text-gray-600">Ottieni aiuto e supporto per il tuo account BoomFi</p>
        </div>
        <button
          onClick={() => setShowNewTicketForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
        >
          <TicketIcon className="w-5 h-5" />
          <span>Nuovo Ticket</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Chat dal Vivo</h3>
              <p className="text-sm text-gray-500">Disponibile 24/7</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <PhoneIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Supporto Telefonico</h3>
              <p className="text-sm text-gray-500">Lun-Ven 9-18</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-sm text-gray-500">support@boomfi.com</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <QuestionMarkCircleIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">FAQ</h3>
              <p className="text-sm text-gray-500">Risposte rapide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Panoramica', icon: '📊' },
            { id: 'tickets', name: 'I Miei Ticket', icon: '🎫' },
            { id: 'faq', name: 'FAQ', icon: '❓' },
            { id: 'resources', name: 'Risorse', icon: '📚' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Tickets */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Recenti</h2>
                <div className="space-y-3">
                  {tickets.slice(0, 3).map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{ticket.id}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[ticket.status]}`}>
                          {statusLabels[ticket.status]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{ticket.subject}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {new Date(ticket.lastUpdate).toLocaleDateString('it-IT')}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('tickets')}
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Vedi tutti i ticket →
                </button>
              </div>

              {/* Popular FAQs */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">FAQ Popolari</h2>
                <div className="space-y-3">
                  {faqs.slice(0, 3).map((faq) => (
                    <div key={faq.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{faq.answer}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        {faq.helpful} persone hanno trovato utile questa risposta
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('faq')}
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Vedi tutte le FAQ →
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Stato del Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">API Pagamenti</p>
                    <p className="text-sm text-green-700">Operativo</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">Dashboard</p>
                    <p className="text-sm text-green-700">Operativo</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-900">Webhook</p>
                    <p className="text-sm text-yellow-700">Manutenzione</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === 'tickets' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">I Miei Ticket</h2>
              <button
                onClick={() => setShowNewTicketForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Nuovo Ticket
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Oggetto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priorità
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ultimo Aggiornamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{ticket.id}</div>
                        <div className="text-sm text-gray-500">{ticket.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{ticket.subject}</div>
                        <div className="text-sm text-gray-500">{ticket.messages} messaggi</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[ticket.status]}`}>
                          {statusLabels[ticket.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[ticket.priority]}`}>
                          {priorityLabels[ticket.priority]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(ticket.lastUpdate).toLocaleDateString('it-IT')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Visualizza</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Domande Frequenti</h2>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Cerca nelle FAQ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tutte le categorie</option>
                    {categories.filter(cat => cat !== 'all').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 mb-4">{faq.answer}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {faq.category}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {faq.helpful} persone hanno trovato utile questa risposta
                      </span>
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-800 text-sm">👍 Utile</button>
                        <button className="text-red-600 hover:text-red-800 text-sm">👎 Non utile</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nessuna FAQ trovata</h3>
                <p className="mt-1 text-sm text-gray-500">Prova a modificare i termini di ricerca o la categoria.</p>
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Risorse e Documentazione</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📖</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Documentazione API</h3>
                <p className="text-sm text-gray-600 mb-4">Guide complete per integrare le nostre API nel tuo sistema.</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Leggi la documentazione →
                </button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Video Tutorial</h3>
                <p className="text-sm text-gray-600 mb-4">Impara a utilizzare BoomFi con i nostri video tutorial.</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Guarda i video →
                </button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Esempi di Codice</h3>
                <p className="text-sm text-gray-600 mb-4">Esempi pratici di integrazione in diversi linguaggi.</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Vedi gli esempi →
                </button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Strumenti per Sviluppatori</h3>
                <p className="text-sm text-gray-600 mb-4">SDK, plugin e strumenti per semplificare l'integrazione.</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Scarica gli strumenti →
                </button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Best Practices</h3>
                <p className="text-sm text-gray-600 mb-4">Consigli e migliori pratiche per ottimizzare l'uso di BoomFi.</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Leggi le best practices →
                </button>
              </div>

              <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-600 mb-4">Unisciti alla community di sviluppatori BoomFi.</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Partecipa alla community →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Ticket Modal */}
      {showNewTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nuovo Ticket di Supporto</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Oggetto</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descrivi brevemente il problema"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Seleziona una categoria</option>
                  <option value="tecnico">Tecnico</option>
                  <option value="account">Account</option>
                  <option value="fatturazione">Fatturazione</option>
                  <option value="pagamenti">Pagamenti</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priorità</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="low">Bassa</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrizione</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descrivi il problema in dettaglio"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTicketForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Crea Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}