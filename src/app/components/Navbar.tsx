import { MessageSquare, Compass, User } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  profileImage?: string;
}

export function Navbar({ currentPage, onNavigate, profileImage }: NavbarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-900">IA Molière</h1>
            
            <button
              onClick={() => onNavigate('chat')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'chat' || currentPage === 'chat-messages'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </button>
            
            <button
              onClick={() => onNavigate('explorer')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'explorer'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Explorer</span>
            </button>
          </div>
          
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profil"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-gray-300 transition-colors"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}