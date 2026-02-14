import { Navbar } from './Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ExplorerProps {
  onNavigate: (page: string) => void;
  profileImage?: string;
}

const allTexts = [
  {
    id: '1',
    title: 'La Forêt des Ombres',
    author: 'Sophie Martin',
    date: '15 Jan 2026',
    cover: 'https://images.unsplash.com/photo-1711185900806-bf85e7fe7767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwc3RvcnklMjBib29rfGVufDF8fHx8MTc2ODY1OTUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Fantastique',
  },
  {
    id: '2',
    title: 'Murmures du Passé',
    author: 'Alexandre Dubois',
    date: '12 Jan 2026',
    cover: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwdGhyaWxsZXIlMjBib29rfGVufDF8fHx8MTc2ODYxNzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Thriller',
  },
  {
    id: '3',
    title: 'Vers de Minuit',
    author: 'Camille Leroy',
    date: '10 Jan 2026',
    cover: 'https://images.unsplash.com/photo-1635956376848-844259588315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcG9ldHJ5JTIwYm9va3xlbnwxfHx8fDE3Njg2NTk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Poésie',
  },
  {
    id: '4',
    title: 'Le Dernier Chapitre',
    author: 'Lucas Bernard',
    date: '8 Jan 2026',
    cover: 'https://images.unsplash.com/photo-1758803184789-a5dd872fe82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBub3ZlbCUyMGNvdmVyfGVufDF8fHx8MTc2ODY1OTUwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Roman',
  },
  {
    id: '5',
    title: 'Chroniques d\'un Monde Oublié',
    author: 'Marie Petit',
    date: '5 Jan 2026',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBsaXRlcmF0dXJlfGVufDF8fHx8MTc2ODU4Mzc4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Fantasy',
  },
  {
    id: '6',
    title: 'Échos de Silence',
    author: 'Thomas Rousseau',
    date: '3 Jan 2026',
    cover: 'https://images.unsplash.com/photo-1635956376848-844259588315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcG9ldHJ5JTIwYm9va3xlbnwxfHx8fDE3Njg2NTk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Nouvelle',
  },
  {
    id: '7',
    title: 'Au-delà des Étoiles',
    author: 'Emma Moreau',
    date: '1 Jan 2026',
    cover: 'https://images.unsplash.com/photo-1711185900806-bf85e7fe7767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwc3RvcnklMjBib29rfGVufDF8fHx8MTc2ODY1OTUwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Science-Fiction',
  },
  {
    id: '8',
    title: 'Le Gardien des Secrets',
    author: 'Nicolas Laurent',
    date: '28 Dec 2025',
    cover: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwdGhyaWxsZXIlMjBib29rfGVufDF8fHx8MTc2ODYxNzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Mystery',
  },
  {
    id: '9',
    title: 'Fragments d\'Âme',
    author: 'Julie Bonnet',
    date: '25 Dec 2025',
    cover: 'https://images.unsplash.com/photo-1758803184789-a5dd872fe82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBub3ZlbCUyMGNvdmVyfGVufDF8fHx8MTc2ODY1OTUwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Drame',
  },
  {
    id: '10',
    title: 'L\'Aube Nouvelle',
    author: 'Pierre Durand',
    date: '20 Dec 2025',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBsaXRlcmF0dXJlfGVufDF8fHx8MTc2ODU4Mzc4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    genre: 'Aventure',
  },
];

export function Explorer({ onNavigate, profileImage }: ExplorerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const textsPerPage = 10;
  const totalPages = Math.ceil(allTexts.length / textsPerPage);

  const startIndex = (currentPage - 1) * textsPerPage;
  const currentTexts = allTexts.slice(startIndex, startIndex + textsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="explorer" onNavigate={onNavigate} profileImage={profileImage} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl text-gray-900 mb-8">Explorer les textes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentTexts.map((text) => (
            <div
              key={text.id}
              onClick={() => onNavigate('text-detail')}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                <ImageWithFallback
                  src={text.cover}
                  alt={text.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg text-gray-900 flex-1">{text.title}</h2>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full ml-2">
                    {text.genre}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{text.author}</span>
                  <span>{text.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg transition-colors ${
                currentPage === i + 1
                  ? 'bg-gray-900 text-white'
                  : 'border border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
