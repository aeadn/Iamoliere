import { Menu, Plus, MessageSquare, X } from 'lucide-react';
import { useState } from 'react';

interface Conversation {
  id: string;
  title: string;
  date: string;
}

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Burger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={() => {
                onNewConversation();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle discussion</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  onSelectConversation(conv.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-start space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                  currentConversationId === conv.id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0 text-gray-500" />
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm truncate text-gray-900">{conv.title}</p>
                  <p className="text-xs text-gray-500">{conv.date}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
