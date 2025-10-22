'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpenIcon, 
  PlayIcon, 
  DocumentTextIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  type: 'article' | 'video' | 'tutorial' | 'code';
  author: string;
  rating: number;
  views: number;
  lastUpdated: string;
  tags: string[];
  thumbnail?: string;
}

const mockGuides: Guide[] = [
  {
    id: '1',
    title: 'Guida Introduttiva a BoomFi',
    description: 'Impara le basi di BoomFi e come iniziare a processare i tuoi primi pagamenti in pochi minuti.',
    category: 'Introduzione',
    difficulty: 'beginner',
    duration: '10 min',
    type: 'article',
    author: 'Team BoomFi',
    rating: 4.8,
    views: 1250,
    lastUpdated: '2024-01-15',
    tags: ['setup', 'basics', 'getting-started']
  },
  {
    id: '2',
    title: 'Integrazione API: Primi Passi',
    description: 'Tutorial completo per integrare le API di BoomFi nel tuo sito web o applicazione.',
    category: 'Sviluppo',
    difficulty: 'intermediate',
    duration: '25 min',
    type: 'tutorial',
    author: 'Marco Sviluppatore',
    rating: 4.9,
    views: 890,
    lastUpdated: '2024-01-12',
    tags: ['api', 'integration', 'development']
  },
  {
    id: '3',
    title: 'Configurazione Webhook Avanzata',
    description: 'Impara a configurare e gestire i webhook per ricevere notifiche in tempo reale sui pagamenti.',
    category: 'Sviluppo',
    difficulty: 'advanced',
    duration: '35 min',
    type: 'video',
    author: 'Laura Tech',
    rating: 4.7,
    views: 654,
    lastUpdated: '2024-01-10',
    tags: ['webhooks', 'notifications', 'advanced']
  },
  {
    id: '4',
    title: 'Gestione delle Sottoscrizioni',
    description: 'Come creare e gestire abbonamenti ricorrenti con BoomFi per il tuo business.',
    category: 'Business',
    difficulty: 'intermediate',
    duration: '20 min',
    type: 'article',
    author: 'Anna Business',
    rating: 4.6,
    views: 1100,
    lastUpdated: '2024-01-08',
    tags: ['subscriptions', 'recurring', 'business']
  },
  {
    id: '5',
    title: 'Sicurezza e Best Practices',
    description: 'Linee guida essenziali per mantenere sicuri i tuoi pagamenti e proteggere i dati dei clienti.',
    category: 'Sicurezza',
    difficulty: 'intermediate',
    duration: '30 min',
    type: 'article',
    author: 'Giuseppe Security',
    rating: 4.9,
    views: 780,
    lastUpdated: '2024-01-05',
    tags: ['security', 'best-practices', 'compliance']
  },
  {
    id: '6',
    title: 'Esempi di Codice JavaScript',
    description: 'Raccolta di esempi pratici per integrare BoomFi usando JavaScript e Node.js.',
    category: 'Sviluppo',
    difficulty: 'intermediate',
    duration: '15 min',
    type: 'code',
    author: 'Roberto Code',
    rating: 4.8,
    views: 920,
    lastUpdated: '2024-01-03',
    tags: ['javascript', 'nodejs', 'examples']
  },
  {
    id: '7',
    title: 'Ottimizzazione delle Conversioni',
    description: 'Strategie e tecniche per migliorare il tasso di conversione dei tuoi pagamenti online.',
    category: 'Business',
    difficulty: 'advanced',
    duration: '40 min',
    type: 'video',
    author: 'Chiara Marketing',
    rating: 4.7,
    views: 567,
    lastUpdated: '2024-01-01',
    tags: ['conversion', 'optimization', 'marketing']
  },
  {
    id: '8',
    title: 'Gestione degli Errori e Debugging',
    description: 'Come identificare e risolvere i problemi più comuni nell\'integrazione di BoomFi.',
    category: 'Sviluppo',
    difficulty: 'advanced',
    duration: '45 min',
    type: 'tutorial',
    author: 'Francesco Debug',
    rating: 4.5,
    views: 445,
    lastUpdated: '2023-12-28',
    tags: ['debugging', 'errors', 'troubleshooting']
  }
];

const categories = ['Tutti', 'Introduzione', 'Sviluppo', 'Business', 'Sicurezza'];
const difficulties = ['Tutti', 'beginner', 'intermediate', 'advanced'];
const types = ['Tutti', 'article', 'video', 'tutorial', 'code'];

const difficultyLabels = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzato'
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

const typeIcons = {
  article: DocumentTextIcon,
  video: PlayIcon,
  tutorial: AcademicCapIcon,
  code: CodeBracketIcon
};

const typeLabels = {
  article: 'Articolo',
  video: 'Video',
  tutorial: 'Tutorial',
  code: 'Codice'
};

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tutti');
  const [selectedType, setSelectedType] = useState('Tutti');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGuides(mockGuides);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Tutti' || guide.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'Tutti' || guide.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'Tutti' || guide.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesType;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Guide e Tutorial</h1>
          <p className="text-gray-600">Impara a utilizzare BoomFi al massimo delle sue potenzialità</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Guide Totali</p>
              <p className="text-2xl font-bold text-gray-900">{guides.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <PlayIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Video Tutorial</p>
              <p className="text-2xl font-bold text-gray-900">
                {guides.filter(g => g.type === 'video').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CodeBracketIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Esempi Codice</p>
              <p className="text-2xl font-bold text-gray-900">
                {guides.filter(g => g.type === 'code').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tutorial Interattivi</p>
              <p className="text-2xl font-bold text-gray-900">
                {guides.filter(g => g.type === 'tutorial').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cerca Guide</label>
            <input
              type="text"
              placeholder="Cerca per titolo, descrizione o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Livello</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'Tutti' ? difficulty : difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">Tipo:</span>
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedType === type
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'Tutti' ? type : typeLabels[type as keyof typeof typeLabels]}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Mostrando {filteredGuides.length} di {guides.length} guide
        </p>
      </div>

      {/* Guides Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => {
            const IconComponent = typeIcons[guide.type];
            return (
              <div key={guide.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-600">
                        {typeLabels[guide.type]}
                      </span>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${difficultyColors[guide.difficulty]}`}>
                      {difficultyLabels[guide.difficulty]}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{guide.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{guide.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {guide.duration}
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-1" />
                        {guide.views} visualizzazioni
                      </div>
                    </div>
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {guide.rating}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {guide.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">di {guide.author}</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      Leggi <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="divide-y divide-gray-200">
            {filteredGuides.map((guide) => {
              const IconComponent = typeIcons[guide.type];
              return (
                <div key={guide.id} className="p-6 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{guide.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{guide.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              {typeLabels[guide.type]}
                            </span>
                            <span className={`inline-flex px-2 py-1 rounded-full font-medium ${difficultyColors[guide.difficulty]}`}>
                              {difficultyLabels[guide.difficulty]}
                            </span>
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {guide.duration}
                            </div>
                            <div className="flex items-center">
                              <StarIcon className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                              {guide.rating}
                            </div>
                            <span>{guide.views} visualizzazioni</span>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center ml-4">
                          Leggi <ChevronRightIcon className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex flex-wrap gap-1">
                          {guide.tags.map(tag => (
                            <span key={tag} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">di {guide.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nessuna guida trovata</h3>
          <p className="mt-1 text-sm text-gray-500">
            Prova a modificare i filtri di ricerca per trovare le guide che stai cercando.
          </p>
        </div>
      )}

      {/* Popular Categories */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categorie Popolari</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter(cat => cat !== 'Tutti').map(category => {
            const categoryCount = guides.filter(g => g.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900">{category}</h3>
                <p className="text-sm text-gray-500">{categoryCount} guide</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}