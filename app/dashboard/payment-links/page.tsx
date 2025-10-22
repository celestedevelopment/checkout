'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface PaymentLink {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  status: 'active' | 'inactive' | 'expired';
  url: string;
  clicks: number;
  conversions: number;
  createdDate: string;
  expiryDate?: string;
  isRecurring: boolean;
  interval?: 'monthly' | 'yearly';
}

const mockPaymentLinks: PaymentLink[] = [
  {
    id: '1',
    title: 'Premium Subscription',
    description: 'Abbonamento mensile al piano Premium',
    amount: 29.99,
    currency: 'EUR',
    status: 'active',
    url: 'https://pay.boomfi.com/link/premium-monthly',
    clicks: 156,
    conversions: 23,
    createdDate: '2024-01-01',
    isRecurring: true,
    interval: 'monthly'
  },
  {
    id: '2',
    title: 'One-time Consultation',
    description: 'Consulenza personalizzata di 1 ora',
    amount: 150.00,
    currency: 'EUR',
    status: 'active',
    url: 'https://pay.boomfi.com/link/consultation',
    clicks: 89,
    conversions: 12,
    createdDate: '2024-01-05',
    isRecurring: false
  },
  {
    id: '3',
    title: 'Annual Plan Discount',
    description: 'Piano annuale con sconto del 20%',
    amount: 299.99,
    currency: 'EUR',
    status: 'inactive',
    url: 'https://pay.boomfi.com/link/annual-discount',
    clicks: 45,
    conversions: 8,
    createdDate: '2023-12-15',
    expiryDate: '2024-01-31',
    isRecurring: false
  },
  {
    id: '4',
    title: 'Enterprise Setup',
    description: 'Configurazione iniziale per clienti Enterprise',
    amount: 999.00,
    currency: 'EUR',
    status: 'active',
    url: 'https://pay.boomfi.com/link/enterprise-setup',
    clicks: 12,
    conversions: 3,
    createdDate: '2024-01-10',
    isRecurring: false
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  expired: 'bg-red-100 text-red-800'
};

const statusLabels = {
  active: 'Attivo',
  inactive: 'Inattivo',
  expired: 'Scaduto'
};

export default function PaymentLinksPage() {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof PaymentLink>('createdDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPaymentLinks(mockPaymentLinks);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (field: keyof PaymentLink) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const filteredAndSortedLinks = paymentLinks
    .filter(link => filterStatus === 'all' || link.status === filterStatus)
    .sort((a, b) => {
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

  const totalClicks = filteredAndSortedLinks.reduce((sum, link) => sum + link.clicks, 0);
  const totalConversions = filteredAndSortedLinks.reduce((sum, link) => sum + link.conversions, 0);
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100) : 0;
  const totalRevenue = filteredAndSortedLinks.reduce((sum, link) => sum + (link.conversions * link.amount), 0);

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
          <h1 className="text-2xl font-bold text-gray-900">Payment Links</h1>
          <p className="text-gray-600">Crea e gestisci i tuoi link di pagamento</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          Nuovo Link
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Link Attivi</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredAndSortedLinks.filter(link => link.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Click Totali</p>
              <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasso Conversione</p>
              <p className="text-2xl font-bold text-gray-900">{conversionRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ricavi Totali</p>
              <p className="text-2xl font-bold text-gray-900">€{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stato</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti</option>
              <option value="active">Attivi</option>
              <option value="inactive">Inattivi</option>
              <option value="expired">Scaduti</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payment Links Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Titolo</span>
                    {sortField === 'title' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Importo</span>
                    {sortField === 'amount' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('clicks')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Click</span>
                    {sortField === 'clicks' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('conversions')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Conversioni</span>
                    {sortField === 'conversions' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedLinks.map((link) => (
                <tr key={link.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{link.title}</div>
                    <div className="text-sm text-gray-500">{link.description}</div>
                    {link.isRecurring && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        Ricorrente ({link.interval === 'monthly' ? 'Mensile' : 'Annuale'})
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      €{link.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[link.status]}`}>
                      {statusLabels[link.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {link.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{link.conversions}</div>
                    <div className="text-sm text-gray-500">
                      {link.clicks > 0 ? ((link.conversions / link.clicks) * 100).toFixed(1) : 0}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {link.url}
                      </div>
                      <button
                        onClick={() => copyToClipboard(link.url, link.id)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copia link"
                      >
                        <ClipboardIcon className="w-4 h-4" />
                      </button>
                      {copiedId === link.id && (
                        <span className="text-xs text-green-600">Copiato!</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Modifica</button>
                      <button className="text-green-600 hover:text-green-900">Statistiche</button>
                      <button className="text-red-600 hover:text-red-900">Elimina</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedLinks.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun payment link trovato</h3>
          <p className="mt-1 text-sm text-gray-500">Inizia creando il tuo primo link di pagamento.</p>
        </div>
      )}
    </div>
  );
}