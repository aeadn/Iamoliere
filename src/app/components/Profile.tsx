import { Settings, Edit2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './Navbar';

interface ProfileProps {
  onNavigate: (page: string) => void;
  profileImage?: string;
}

const publishedTexts = [
  {
    id: '1',
    title: 'La Forêt des Ombres',
    genre: 'Fantastique',
    date: '15 Jan 2026',
    views: 2453,
  },
  {
    id: '2',
    title: 'Murmures du Passé',
    genre: 'Thriller',
    date: '8 Jan 2026',
    views: 1892,
  },
  {
    id: '3',
    title: 'Vers de Minuit',
    genre: 'Poésie',
    date: '1 Jan 2026',
    views: 1234,
  },
];

export function Profile({ onNavigate, profileImage }: ProfileProps) {
  const [activeTab, setActiveTab] = useState<'texts' | 'settings'>('texts');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(
    'Auteur passionné de fantasy et de poésie. J\'explore les mondes imaginaires et les émotions humaines à travers mes écrits.'
  );
  const [tempBio, setTempBio] = useState(bio);

  const handleSaveBio = () => {
    setBio(tempBio);
    setIsEditingBio(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="profile" onNavigate={onNavigate} profileImage={profileImage} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 h-32"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-start -mt-16 mb-4">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Photo de profil"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl text-gray-600">A</span>
                </div>
              )}
              <div className="ml-6 mt-16">
                <h1 className="text-2xl text-gray-900">Sophie Martin</h1>
                <p className="text-gray-600">@sophiemartin</p>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm text-gray-600">Description</h2>
                <button
                  onClick={() => {
                    if (isEditingBio) {
                      handleSaveBio();
                    } else {
                      setIsEditingBio(true);
                      setTempBio(bio);
                    }
                  }}
                  className="text-sm text-gray-900 hover:text-gray-700 flex items-center space-x-1"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>{isEditingBio ? 'Enregistrer' : 'Modifier'}</span>
                </button>
              </div>
              {isEditingBio ? (
                <textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700">{bio}</p>
              )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab('texts')}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === 'texts'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Textes publiés</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`pb-3 border-b-2 transition-colors ${
                    activeTab === 'settings'
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Paramètres</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Content */}
            {activeTab === 'texts' ? (
              <div className="space-y-3">
                {publishedTexts.map((text) => (
                  <div
                    key={text.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onNavigate('text-detail')}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-gray-900 mb-1">{text.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span>{text.genre}</span>
                          <span>•</span>
                          <span>{text.date}</span>
                          <span>•</span>
                          <span>{text.views} vues</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nom d'utilisateur</label>
                  <input
                    type="text"
                    defaultValue="sophiemartin"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="sophie.martin@email.com"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Langue</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900">
                    <option>Français</option>
                    <option>English</option>
                    <option>Español</option>
                  </select>
                </div>
                <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                  Enregistrer les modifications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
