'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'chargeback' | 'subscription' | 'invoice';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  customerName: string;
  customerEmail: string;
  description: string;
  paymentMethod: 'card' | 'bank_transfer' | 'paypal' | 'crypto';
  transactionDate: string;
  reference: string;
  fees: number;
  netAmount: number;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    amount: 29.99,
    currency: 'EUR',
    status: 'completed',
    customerName: 'Marco Rossi',
    customerEmail: 'marco.rossi@email.com',
    description: 'Abbonamento Premium - Gennaio 2024',
    paymentMethod: 'card',
    transactionDate: '2024-01-15T10:30:00Z',
    reference: 'TXN-001-2024',
    fees: 1.20,
    netAmount: 28.79
  },
  {
    id: '2',
    type: 'subscription',
    amount: 99.99,
    currency: 'EUR',
    status: 'completed',
    customerName: 'Laura Bianchi',
    customerEmail: 'laura.bianchi@company.com',
    description: 'Piano Enterprise - Rinnovo Mensile',
    paymentMethod: 'bank_transfer',
    transactionDate: '2024-01-14T14:22:00Z',
    reference: 'TXN-002-2024',
    fees: 2.50,
    netAmount: 97.49
  },
  {
    id: '3',
    type: 'invoice',
    amount: 1500.00,
    currency: 'EUR',
    status: 'pending',
    customerName: 'Tech Solutions Ltd',
    customerEmail: 'billing@techsolutions.com',
    description: 'Servizi di Consulenza - Q1 2024',
    paymentMethod: 'bank_transfer',
    transactionDate: '2024-01-13T09:15:00Z',
    reference: 'TXN-003-2024',
    fees: 15.00,
    netAmount: 1485.00
  },
  {
    id: '4',
    type: 'refund',
    amount: -29.99,
    currency: 'EUR',
    status: 'completed',
    customerName: 'Giuseppe Verdi',
    customerEmail: 'g.verdi@startup.com',
    description: 'Rimborso Abbonamento Premium',
    paymentMethod: 'card',
    transactionDate: '2024-01-12T16:45:00Z',
    reference: 'TXN-004-2024',
    fees: -1.20,
    netAmount: -28.79
  },
  {
    id: '5',
    type: 'payment',
    amount: 750.00,
    currency: 'EUR',
    status: 'failed',
    customerName: 'Anna Ferrari',
    customerEmail: 'anna.ferrari@email.com',
    description: 'Pagamento una tantum - Consulenza',
    paymentMethod: 'card',
    transactionDate: '2024-01-11T11:20:00Z',
    reference: 'TXN-005-2024',
    fees: 0,
    netAmount: 0
  },
  {
    id: '6',
    type: 'payment',
    amount: 199.99,
    currency: 'EUR',
    status: 'completed',
    customerName: 'Roberto Conti',
    customerEmail: 'r.conti@business.com',
    description: 'Licenza Software Annuale',
    paymentMethod: 'paypal',
    transactionDate: '2024-01-10T13:30:00Z',
    reference: 'TXN-006-2024',
    fees: 6.00,
    netAmount: 193.99
  }
];

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800'
};

const statusLabels = {
  completed: 'Completata',
  pending: 'In Attesa',
  failed: 'Fallita',
  cancelled: 'Cancellata'
};

const typeColors = {
  payment: 'bg-blue-100 text-blue-800',
  refund: 'bg-orange-100 text-orange-800',
  chargeback: 'bg-red-100 text-red-800',
  subscription: 'bg-purple-100 text-purple-800',
  invoice: 'bg-green-100 text-green-800'
};

const typeLabels = {
  payment: 'Pagamento',
  refund: 'Rimborso',
  chargeback: 'Chargeback',
  subscription: 'Abbonamento',
  invoice: 'Fattura'
};

const paymentMethodLabels = {
  card: 'Carta',
  bank_transfer: 'Bonifico',
  paypal: 'PayPal',
  crypto: 'Crypto'
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof Transaction>('transactionDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTransactions(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedTransactions = transactions
    .filter(transaction => {
      const statusMatch = filterStatus === 'all' || transaction.status === filterStatus;
      const typeMatch = filterType === 'all' || transaction.type === filterType;
      const paymentMethodMatch = filterPaymentMethod === 'all' || transaction.paymentMethod === filterPaymentMethod;
      
      let dateMatch = true;
      if (dateRange !== 'all') {
        const transactionDate = new Date(transaction.transactionDate);
        const now = new Date();
        
        switch (dateRange) {
          case 'today':
            dateMatch = transactionDate.toDateString() === now.toDateString();
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            dateMatch = transactionDate >= weekAgo;
            break;
          case 'month':
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            dateMatch = transactionDate >= monthAgo;
            break;
        }
      }
      
      return statusMatch && typeMatch && paymentMethodMatch && dateMatch;
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

  const totalVolume = filteredAndSortedTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const totalFees = filteredAndSortedTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.fees, 0);
  
  const netRevenue = filteredAndSortedTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.netAmount, 0);
  
  const successRate = filteredAndSortedTransactions.length > 0
    ? (filteredAndSortedTransactions.filter(t => t.status === 'completed').length / filteredAndSortedTransactions.length * 100)
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
          <h1 className="text-2xl font-bold text-gray-900">Transazioni</h1>
          <p className="text-gray-600">Monitora tutte le transazioni e i pagamenti</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50">
            Esporta
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            Nuova Transazione
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Volume Totale</p>
              <p className="text-2xl font-bold text-gray-900">€{totalVolume.toLocaleString()}</p>
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
              <p className="text-sm font-medium text-gray-600">Ricavi Netti</p>
              <p className="text-2xl font-bold text-gray-900">€{netRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Commissioni</p>
              <p className="text-2xl font-bold text-gray-900">€{totalFees.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tasso di Successo</p>
              <p className="text-2xl font-bold text-gray-900">{successRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filtri:</span>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Periodo</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti</option>
              <option value="today">Oggi</option>
              <option value="week">Ultima Settimana</option>
              <option value="month">Ultimo Mese</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stato</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti</option>
              <option value="completed">Completate</option>
              <option value="pending">In Attesa</option>
              <option value="failed">Fallite</option>
              <option value="cancelled">Cancellate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti</option>
              <option value="payment">Pagamenti</option>
              <option value="subscription">Abbonamenti</option>
              <option value="invoice">Fatture</option>
              <option value="refund">Rimborsi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metodo</label>
            <select
              value={filterPaymentMethod}
              onChange={(e) => setFilterPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti</option>
              <option value="card">Carta</option>
              <option value="bank_transfer">Bonifico</option>
              <option value="paypal">PayPal</option>
              <option value="crypto">Crypto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('reference')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Riferimento</span>
                    {sortField === 'reference' && (
                      sortDirection === 'asc' ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metodo
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('transactionDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Data</span>
                    {sortField === 'transactionDate' && (
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
              {filteredAndSortedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.reference}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.customerName}</div>
                    <div className="text-sm text-gray-500">{transaction.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[transaction.type]}`}>
                      {typeLabels[transaction.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}€{transaction.amount.toLocaleString()}
                    </div>
                    {transaction.status === 'completed' && (
                      <div className="text-xs text-gray-500">
                        Netto: €{transaction.netAmount.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[transaction.status]}`}>
                      {statusLabels[transaction.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {paymentMethodLabels[transaction.paymentMethod]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(transaction.transactionDate).toLocaleDateString('it-IT')}
                    <div className="text-xs text-gray-500">
                      {new Date(transaction.transactionDate).toLocaleTimeString('it-IT', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">Dettagli</button>
                      {transaction.status === 'completed' && transaction.type === 'payment' && (
                        <button className="text-orange-600 hover:text-orange-900">Rimborsa</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAndSortedTransactions.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessuna transazione trovata</h3>
          <p className="mt-1 text-sm text-gray-500">Le transazioni appariranno qui quando saranno disponibili.</p>
        </div>
      )}
    </div>
  );
}