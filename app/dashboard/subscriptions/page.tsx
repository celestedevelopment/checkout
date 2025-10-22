'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface Subscription {
  id: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  planType: 'basic' | 'premium' | 'enterprise';
  amount: number;
  currency: string;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing' | 'paused';
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  nextBillingDate: string;
  trialEndDate?: string;
  cancelledDate?: string;
  totalRevenue: number;
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    customerName: 'Marco Rossi',
    customerEmail: 'marco.rossi@email.com',
    planName: 'Piano Premium',
    planType: 'premium',
    amount: 29.99,
    currency: 'EUR',
    status: 'active',
    billingCycle: 'monthly',
    startDate: '2023-12-01',
    nextBillingDate: '2024-02-01',
    totalRevenue: 89.97
  },
  {
    id: '2',
    customerName: 'Laura Bianchi',
    customerEmail: 'laura.bianchi@company.com',
    planName: 'Piano Enterprise',
    planType: 'enterprise',
    amount: 99.99,
    currency: 'EUR',
    status: 'active',
    billingCycle: 'monthly',
    startDate: '2023-11-15',
    nextBillingDate: '2024-02-15',
    totalRevenue: 299.97
  },
  {
    id: '3',
    customerName: 'Giuseppe Verdi',
    customerEmail: 'g.verdi@startup.com',
    planName: 'Piano Basic',
    planType: 'basic',
    amount: 9.99,
    currency: 'EUR',
    status: 'trialing',
    billingCycle: 'monthly',
    startDate: '2024-01-10',
    nextBillingDate: '2024-01-24',
    trialEndDate: '2024-01-24',
    totalRevenue: 0
  },
  {
    id: '4',
    customerName: 'Anna Ferrari',
    customerEmail: 'anna.ferrari@email.com',
    planName: 'Piano Premium Annuale',
    planType: 'premium',
    amount: 299.99,
    currency: 'EUR',
    status: 'cancelled',
    billingCycle: 'yearly',
    startDate: '2023-06-01',
    nextBillingDate: '2024-06-01',
    cancelledDate: '2024-01-05',
    totalRevenue: 299.99
  },
  {
    id: '5',
    customerName: 'Roberto Conti',
    customerEmail: 'r.conti@business.com',
    planName: 'Piano Premium',
    planType: 'premium',
    amount: 29.99,
    currency: 'EUR',
    status: 'past_due',
    billingCycle: 'monthly',
    startDate: '2023-10-01',
    nextBillingDate: '2024-01-01',
    totalRevenue: 119.96
  }
];

const statusColors = {
  active: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  past_due: 'bg-orange-100 text-orange-800',
  trialing: 'bg-blue-100 text-blue-800',
  paused: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  active: 'Attivo',
  cancelled: 'Cancellato',
  past_due: 'Scaduto',
  trialing: 'In Prova',
  paused: 'In Pausa'
};

const planTypeColors = {
  basic: 'bg-gray-100 text-gray-800',
  premium: 'bg-blue-100 text-blue-800',
  enterprise: 'bg-purple-100 text-purple-800'
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Subscription>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (field: keyof Subscription) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedSubscriptions = subscriptions
    .filter(sub => {
      const statusMatch = filterStatus === 'all' || sub.status === filterStatus;
      const planMatch = filterPlan === 'all' || sub.planType === filterPlan;
      return statusMatch && planMatch;
    })
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

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
  const totalMRR = subscriptions
    .filter(sub => sub.status === 'active' && sub.billingCycle === 'monthly')
    .reduce((sum, sub) => sum + sub.amount, 0);
  const totalARR = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => {
      return sum + (sub.billingCycle === 'monthly' ? sub.amount * 12 : sub.amount);
    }, 0);
  const churnRate = subscriptions.length > 0 
    ? (subscriptions.filter(sub => sub.status === 'cancelled').length / subscriptions.length * 100)
    : 0;

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
          <h1 className="text-2xl font-bold text-gray-900">Abbonamenti</h1>
          <p className="text-gray-600">Monitora e gestisci tutti gli abbonamenti</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
          Nuovo Piano
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Abbonamenti Attivi</p>
              <p className="text-2xl font-bold text-gray-900">{activeSubscriptions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">MRR</p>
              <p className="text-2xl font-bold text-gray-900">€{totalMRR.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ARR</p>
              <p className="text-2xl font-bold text-gray-900">€{totalARR.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Churn Rate</p>
              <p className="text-2xl font-bold text-gray-900">{churnRate.toFixed(1)}%</p>
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
              <option value="trialing">In Prova</option>
              <option value="past_due">Scaduti</option>
              <option value="cancelled">Cancellati</option>
              <option value="paused">In Pausa</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Piano</label>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('customerName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Cliente</span>
                    {sortField === 'customerName' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('planName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Piano</span>
                    {sortField === 'planName' && (
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
                  onClick={() => handleSort('nextBillingDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Prossima Fatturazione</span>
                    {sortField === 'nextBillingDate' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('totalRevenue')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Ricavi Totali</span>
                    {sortField === 'totalRevenue' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subscription.customerName}</div>
                    <div className="text-sm text-gray-500">{subscription.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{subscription.planName}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${planTypeColors[subscription.planType]}`}>
                        {subscription.planType.charAt(0).toUpperCase() + subscription.planType.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {subscription.billingCycle === 'monthly' ? 'Mensile' : 'Annuale'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      €{subscription.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      /{subscription.billingCycle === 'monthly' ? 'mese' : 'anno'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[subscription.status]}`}>
                      {statusLabels[subscription.status]}
                    </span>
                    {subscription.status === 'trialing' && subscription.trialEndDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Scade: {new Date(subscription.trialEndDate).toLocaleDateString('it-IT')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.status !== 'cancelled' ? (
                      new Date(subscription.nextBillingDate).toLocaleDateString('it-IT')
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      €{subscription.totalRevenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Visualizza</button>
                      {subscription.status === 'active' && (
                        <button className="text-orange-600 hover:text-orange-900">Pausa</button>
                      )}
                      {subscription.status !== 'cancelled' && (
                        <button className="text-red-600 hover:text-red-900">Cancella</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessun abbonamento trovato</h3>
          <p className="mt-1 text-sm text-gray-500">I tuoi abbonamenti appariranno qui quando saranno disponibili.</p>
        </div>
      )}
    </div>
  );
}