import { Send, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface ChatHomeProps {
  onNavigate: (page: string) => void;
  profileImage?: string;
}

const conversations = [
  { id: '1', title: 'Mon premier roman', date: 'Aujourd\'hui' },
  { id: '2', title: 'Nouvelle fantastique', date: 'Hier' },
  { id: '3', title: 'Poésie moderne', date: 'Il y a 3 jours' },
  { id: '4', title: 'Thriller psychologique', date: 'Il y a 1 semaine' },
];

const textStyles = [
  'Narratif',
  'Descriptif',
  'Poétique',
  'Argumentatif',
  'Épistolaire',
  'Dialogué',
];

const examplePrompts = [
  'Écris-moi le début d\'un roman fantastique',
  'Aide-moi à développer un personnage',
  'Crée une scène de dialogue intense',
  'Suggère des idées pour une nouvelle',
];

export function ChatHome({ onNavigate, profileImage }: ChatHomeProps) {
  const [message, setMessage] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Narratif');
  const [isStyleOpen, setIsStyleOpen] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      // Navigate to chat with messages when user sends first message
      onNavigate('chat-messages');
    }
  };

  const handleExampleClick = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar currentPage="chat" onNavigate={onNavigate} profileImage={profileImage} />
      <Sidebar
        conversations={conversations}
        currentConversationId="1"
        onSelectConversation={(id) => {
          if (id === '1') {
            onNavigate('chat-messages');
          }
        }}
        onNewConversation={() => console.log('New conversation')}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">
              Bienvenue sur IA Molière
            </h2>
            <p className="text-gray-600 mb-8">
              Votre assistant d'écriture intelligent. Commencez une conversation pour créer votre prochaine œuvre.
            </p>

            {/* Example prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleExampleClick(prompt)}
                  className="text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all text-sm text-gray-700"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <label className="text-sm text-gray-600">Style :</label>
              <div className="relative">
                <button
                  onClick={() => setIsStyleOpen(!isStyleOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm">{selectedStyle}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isStyleOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {textStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => {
                          setSelectedStyle(style);
                          setIsStyleOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                          selectedStyle === style ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-end space-x-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Écrivez votre message..."
                className="flex-1 resize-none border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                rows={3}
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}