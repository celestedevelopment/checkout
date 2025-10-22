# Dashboard Module

Questo modulo contiene tutti i componenti, utilities e configurazioni per la dashboard utente del SaaS BoomFi.

## 📁 Struttura delle Cartelle

```
app/dashboard/
├── components/           # Componenti React
│   ├── layout/          # Componenti di layout (Header, Sidebar, Layout)
│   ├── shared/          # Componenti condivisi riutilizzabili
│   └── ui/              # Componenti UI base (Cards, Spinner, etc.)
├── pages/               # Pagine della dashboard
├── hooks/               # Custom hooks per la dashboard
├── utils/               # Funzioni utility
├── types/               # Definizioni TypeScript
├── constants/           # Costanti e configurazioni
├── index.ts            # Export principale del modulo
└── README.md           # Questa documentazione
```

## 🧩 Componenti Principali

### Layout Components

- **`DashboardLayout`**: Layout principale che combina header, sidebar e contenuto
- **`DashboardHeader`**: Header con menu utente e notifiche
- **`DashboardSidebar`**: Sidebar di navigazione con menu collassabile

### Shared Components

- **`UserAvatar`**: Avatar utente con iniziali o immagine
- **`Logo`**: Logo BoomFi riutilizzabile con diverse dimensioni

### UI Components

- **`StatsCard`**: Card per visualizzare statistiche con icone e variazioni
- **`LoadingSpinner`**: Spinner di caricamento con diverse dimensioni

## 📄 Pagine

- **`DashboardHome`**: Pagina principale con overview e statistiche

## 🎣 Hooks

- **`useDashboard`**: Hook principale per gestire stato utente, statistiche e preferenze

## 🛠 Utilities

Funzioni helper per:
- Formattazione nomi utente e iniziali
- Gestione sottoscrizioni e stati
- Formattazione date e valute
- Validazione input
- Gestione tema e storage

## 📊 Types

Definizioni TypeScript per:
- `DashboardUser`: Dati utente completi
- `UserSubscription`: Informazioni sottoscrizione
- `UserPreferences`: Preferenze utente
- `DashboardStats`: Statistiche dashboard
- Props dei componenti

## ⚙️ Costanti

Configurazioni centralizzate per:
- Layout (dimensioni sidebar, breakpoints)
- API endpoints
- Piani e stati sottoscrizione
- Temi e colori
- Formati data
- Validazioni
- Lingue e valute supportate

## 🚀 Come Utilizzare

### Esempio Base

```tsx
import { 
  DashboardLayout, 
  DashboardHome, 
  useDashboard 
} from '@/app/dashboard';

function Dashboard() {
  const { user, stats, loading, sidebarCollapsed, toggleSidebar } = useDashboard('user-id');

  if (loading || !user) {
    return <LoadingSpinner size="lg" />;
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
```

### Utilizzo Componenti Singoli

```tsx
import { UserAvatar, StatsCard } from '@/app/dashboard';

// Avatar utente
<UserAvatar name="Mario Rossi" size="lg" />

// Card statistiche
<StatsCard
  title="Transazioni Totali"
  value={1250}
  change={{ value: 12.5, type: 'increase' }}
  icon={<TransactionIcon />}
/>
```

## 🎨 Personalizzazione

### Temi
Il sistema supporta temi light/dark/system configurabili tramite le costanti in `constants/index.ts`.

### Colori
I colori sono definiti in `CHART_COLORS` e `STATUS_COLORS` per mantenere consistenza visiva.

### Menu di Navigazione
Il menu è configurabile tramite `DASHBOARD_MENU_ITEMS` nelle costanti.

## 🔧 Configurazione API

Gli endpoint API sono centralizzati in `API_ENDPOINTS`:

```typescript
const endpoints = {
  USER: '/api/dashboard/user',
  STATS: '/api/dashboard/stats',
  TRANSACTIONS: '/api/dashboard/transactions',
  // ...
};
```

## 📱 Responsive Design

Tutti i componenti sono progettati per essere responsive utilizzando:
- Breakpoints Tailwind CSS
- Layout flessibili
- Sidebar collassabile su mobile
- Grid responsive per le statistiche

## 🌐 Internazionalizzazione

Il modulo utilizza il sistema di traduzione esistente del progetto:
- Hook `useT` per traduzioni
- Chiavi di traduzione standardizzate
- Supporto per tutte le lingue del progetto

## 🔒 Sicurezza

- Validazione input tramite utilities
- Sanitizzazione dati utente
- Gestione sicura del localStorage
- Protezione contro XSS nelle immagini avatar

## 📈 Performance

- Lazy loading dei componenti
- Memoizzazione dove appropriata
- Ottimizzazione bundle tramite tree-shaking
- Refresh intelligente dei dati

## 🧪 Testing

Per testare i componenti:

```bash
# Test unitari
npm run test dashboard

# Test di integrazione
npm run test:integration dashboard
```

## 📝 Note di Sviluppo

1. **Estensibilità**: La struttura modulare permette facile aggiunta di nuovi componenti
2. **Riutilizzabilità**: I componenti shared possono essere usati in altre parti dell'app
3. **Manutenibilità**: Separazione chiara tra logica, UI e configurazione
4. **Type Safety**: Tipizzazione completa TypeScript per tutti i componenti

## 🔄 Aggiornamenti Futuri

- [ ] Aggiungere più tipi di grafici
- [ ] Implementare notifiche real-time
- [ ] Aggiungere export dati
- [ ] Migliorare accessibilità
- [ ] Aggiungere più temi personalizzabili