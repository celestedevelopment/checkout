'use client';

import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CalendarIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  value: number;
  probability: number;
  assignedTo: string;
  createdAt: string;
  lastContact: string;
  notes: string;
  tags: string[];
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    phone: '+39 123 456 7890',
    company: 'Tech Solutions SRL',
    source: 'Website',
    status: 'new',
    value: 15000,
    probability: 20,
    assignedTo: 'Anna Bianchi',
    createdAt: '2024-01-15',
    lastContact: '2024-01-15',
    notes: 'Interessato ai nostri servizi di pagamento per e-commerce',
    tags: ['e-commerce', 'high-value']
  },
  {
    id: '2',
    name: 'Laura Verdi',
    email: 'laura.verdi@startup.it',
    phone: '+39 987 654 3210',
    company: 'StartupInnovativa',
    source: 'LinkedIn',
    status: 'contacted',
    value: 8000,
    probability: 40,
    assignedTo: 'Giuseppe Neri',
    createdAt: '2024-01-12',
    lastContact: '2024-01-14',
    notes: 'Startup in fase di crescita, necessita soluzioni scalabili',
    tags: ['startup', 'scalable']
  },
  {
    id: '3',
    name: 'Roberto Ferrari',
    email: 'r.ferrari@retail.com',
    phone: '+39 555 123 4567',
    company: 'Retail Chain Italia',
    source: 'Referral',
    status: 'qualified',
    value: 25000,
    probability: 60,
    assignedTo: 'Anna Bianchi',
    createdAt: '2024-01-10',
    lastContact: '2024-01-13',
    notes: 'Catena retail con 50+ negozi, interessata a soluzioni omnichannel',
    tags: ['retail', 'enterprise', 'omnichannel']
  },
  {
    id: '4',
    name: 'Chiara Blu',
    email: 'chiara@consulting.it',
    phone: '+39 333 987 6543',
    company: 'Business Consulting',
    source: 'Event',
    status: 'proposal',
    value: 12000,
    probability: 75,
    assignedTo: 'Giuseppe Neri',
    createdAt: '2024-01-08',
    lastContact: '2024-01-12',
    notes: 'Proposta inviata per integrazione API, in attesa di feedback',
    tags: ['consulting', 'api-integration']
  },
  {
    id: '5',
    name: 'Francesco Gialli',
    email: 'f.gialli@marketplace.com',
    phone: '+39 444 555 6666',
    company: 'Marketplace Online',
    source: 'Google Ads',
    status: 'negotiation',
    value: 30000,
    probability: 80,
    assignedTo: 'Anna Bianchi',
    createdAt: '2024-01-05',
    lastContact: '2024-01-11',
    notes: 'In fase di negoziazione contratto, discussione sui termini di pagamento',
    tags: ['marketplace', 'high-value', 'negotiation']
  },
  {
    id: '6',
    name: 'Valentina Rosa',
    email: 'v.rosa@fashion.it',
    phone: '+39 777 888 9999',
    company: 'Fashion Brand',
    source: 'Social Media',
    status: 'closed-won',
    value: 18000,
    probability: 100,
    assignedTo: 'Giuseppe Neri',
    createdAt: '2024-01-03',
    lastContact: '2024-01-10',
    notes: 'Contratto firmato! Implementazione prevista per febbraio',
    tags: ['fashion', 'closed-won', 'implementation']
  },
  {
    id: '7',
    name: 'Davide Viola',
    email: 'd.viola@services.com',
    phone: '+39 111 222 3333',
    company: 'Professional Services',
    source: 'Cold Call',
    status: 'closed-lost',
    value: 10000,
    probability: 0,
    assignedTo: 'Anna Bianchi',
    createdAt: '2024-01-01',
    lastContact: '2024-01-09',
    notes: 'Hanno scelto un competitor per costi più bassi',
    tags: ['services', 'closed-lost', 'price-sensitive']
  }
];

const statusLabels = {
  'new': 'Nuovo',
  'contacted': 'Contattato',
  'qualified': 'Qualificato',
  'proposal': 'Proposta',
  'negotiation': 'Negoziazione',
  'closed-won': 'Chiuso Vinto',
  'closed-lost': 'Chiuso Perso'
};

const statusColors = {
  'new': 'bg-gray-100 text-gray-800',
  'contacted': 'bg-blue-100 text-blue-800',
  'qualified': 'bg-yellow-100 text-yellow-800',
  'proposal': 'bg-purple-100 text-purple-800',
  'negotiation': 'bg-orange-100 text-orange-800',
  'closed-won': 'bg-green-100 text-green-800',
  'closed-lost': 'bg-red-100 text-red-800'
};

const sources = ['Tutti', 'Website', 'LinkedIn', 'Referral', 'Event', 'Google Ads', 'Social Media', 'Cold Call'];
const statuses = ['Tutti', 'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('Tutti');
  const [selectedStatus, setSelectedStatus] = useState('Tutti');
  const [sortField, setSortField] = useState<keyof Lead>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = selectedSource === 'Tutti' || lead.source === selectedSource;
    const matchesStatus = selectedStatus === 'Tutti' || lead.status === selectedStatus;
    
    return matchesSearch && matchesSource && matchesStatus;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Calculate statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const closedWonLeads = leads.filter(l => l.status === 'closed-won').length;
  const totalValue = leads.reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0);
  const conversionRate = totalLeads > 0 ? (closedWonLeads / totalLeads * 100) : 0;

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
          <h1 className="text-2xl font-bold text-gray-900">Gestione Leads</h1>
          <p className="text-gray-600">Gestisci e monitora i tuoi potenziali clienti</p>
        </div>
        <button
          onClick={() => setShowNewLeadModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nuovo Lead</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Leads Totali</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <StarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Nuovi Leads</p>
              <p className="text-2xl font-bold text-gray-900">{newLeads}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasso Conversione</p>
              <p className="text-2xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valore Pipeline</p>
              <p className="text-2xl font-bold text-gray-900">€{totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cerca Leads</label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca per nome, email o azienda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fonte</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stato</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'Tutti' ? status : statusLabels[status as keyof typeof statusLabels]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Mostrando {sortedLeads.length} di {leads.length} leads
        </p>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Nome</span>
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contatti
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('company')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Azienda</span>
                    {sortField === 'company' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('source')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Fonte</span>
                    {sortField === 'source' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Stato</span>
                    {sortField === 'status' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('value')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Valore</span>
                    {sortField === 'value' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probabilità
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assegnato a
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">Creato: {new Date(lead.createdAt).toLocaleDateString('it-IT')}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {lead.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[lead.status]}`}>
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    €{lead.value.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${lead.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{lead.probability}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {sortedLeads.length === 0 && (
        <div className="text-center py-12">
          <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun lead trovato</h3>
          <p className="mt-1 text-sm text-gray-500">
            Prova a modificare i filtri di ricerca o aggiungi un nuovo lead.
          </p>
        </div>
      )}

      {/* Lead Pipeline Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Vendite</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Object.entries(statusLabels).map(([status, label]) => {
            const count = leads.filter(l => l.status === status).length;
            const value = leads.filter(l => l.status === status).reduce((sum, l) => sum + l.value, 0);
            return (
              <div key={status} className="text-center">
                <div className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusColors[status as keyof typeof statusColors]} mb-2`}>
                  {label}
                </div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-500">€{value.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}