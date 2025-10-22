'use client';

import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import { useDashboard } from './hooks/useDashboard';
import LoadingSpinner from './components/ui/LoadingSpinner';

export default function DashboardPage() {
  // Simula un ID utente - in un'app reale questo verrebbe dal sistema di autenticazione
  const userId = 'demo-user-123';
  
  const { 
    user, 
    stats, 
    loading, 
    error, 
    sidebarCollapsed, 
    toggleSidebar 
  } = useDashboard(userId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Errore nel caricamento
          </h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Utente non trovato
          </h2>
          <p className="text-gray-600">
            Non è stato possibile caricare i dati dell'utente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      user={user}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={toggleSidebar}
    >
      <DashboardHome user={user} stats={stats} />
    </DashboardLayout>
  );
}