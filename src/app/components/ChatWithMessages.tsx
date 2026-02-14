import { Send, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface ChatWithMessagesProps {
  onNavigate: (page: string) => void;
  profileImage?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
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

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Aide-moi à écrire le début d\'un roman fantastique. Je veux commencer avec une scène mystérieuse dans une forêt.',
    timestamp: '14:32',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Excellente idée ! Voici une proposition pour le début de votre roman :\n\nLa brume s\'accrochait aux arbres centenaires comme un linceul oublié. Chaque pas résonnait dans le silence épais de la forêt, chaque craquement de branche morte semblait résonner jusqu\'au cœur même de la terre. Élara s\'arrêta, le souffle court, l\'oreille tendue vers un bruissement qui n\'aurait pas dû être là.\n\nQuelque chose l\'observait. Elle le sentait dans chaque fibre de son être.\n\nSouhaitez-vous que je développe cette scène ou préférez-vous une autre approche ?',
    timestamp: '14:33',
  },
  {
    id: '3',
    role: 'user',
    content: 'C\'est parfait ! Continue avec ce qui observe Élara.',
    timestamp: '14:35',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'Au-delà du rideau de brume, une silhouette se dessinait. Pas tout à fait humaine, pas tout à fait animale. Elle ondulait entre les troncs d\'arbres avec une grâce surnaturelle, ses contours flous se fondant dans l\'obscurité grandissante.\n\nÉlara porta instinctivement la main à l\'amulette qui pendait à son cou – l\'héritage de sa grand-mère, celui qui était censé la protéger des créatures de l\'entre-monde. Mais l\'amulette restait froide et inerte. Soit la créature n\'était pas ce qu\'elle craignait, soit elle était bien plus puissante que tout ce contre quoi le talisman pouvait la protéger.\n\n« Qui va là ? » Sa voix tremblait malgré elle, se perdant dans l\'immensité de la forêt.',
    timestamp: '14:36',
  },
];

export function ChatWithMessages({ onNavigate, profileImage }: ChatWithMessagesProps) {
  const [message, setMessage] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Narratif');
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar currentPage="chat-messages" onNavigate={onNavigate} profileImage={profileImage} />
      <Sidebar
        conversations={conversations}
        currentConversationId="1"
        onSelectConversation={(id) => console.log('Select conversation:', id)}
        onNewConversation={() => console.log('New conversation')}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      msg.role === 'user' ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4">
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
                  <div className="absolute bottom-full left-0 mb-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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
