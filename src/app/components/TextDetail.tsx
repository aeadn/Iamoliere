import { Navbar } from './Navbar';
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { useState } from 'react';

interface TextDetailProps {
  onNavigate: (page: string) => void;
  profileImage?: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}

const initialComments: Comment[] = [
  {
    id: '1',
    author: 'Alexandre Dubois',
    content: 'Magnifique histoire ! L\'atmosphère est vraiment captivante.',
    date: 'Il y a 2 heures',
    likes: 12,
  },
  {
    id: '2',
    author: 'Marie Petit',
    content: 'J\'adore la façon dont tu décris la forêt. On s\'y croirait vraiment.',
    date: 'Il y a 5 heures',
    likes: 8,
  },
  {
    id: '3',
    author: 'Lucas Bernard',
    content: 'Vivement la suite ! Tu as un vrai talent pour créer du suspense.',
    date: 'Hier',
    likes: 15,
  },
];

export function TextDetail({ onNavigate, profileImage }: TextDetailProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(247);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Vous',
        content: newComment,
        date: 'À l\'instant',
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage="" onNavigate={onNavigate} profileImage={profileImage} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
              <span className="bg-gray-100 px-3 py-1 rounded-full">Fantastique</span>
              <span>•</span>
              <span>15 Jan 2026</span>
              <span>•</span>
              <span>12 min de lecture</span>
            </div>
            <h1 className="text-4xl text-gray-900 mb-4">La Forêt des Ombres</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>Par Sophie Martin</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="prose prose-lg max-w-none mb-8 text-gray-800 space-y-4">
            <p>
              La brume s'accrochait aux arbres centenaires comme un linceul oublié. Chaque pas résonnait dans le silence épais de la forêt, chaque craquement de branche morte semblait résonner jusqu'au cœur même de la terre. Élara s'arrêta, le souffle court, l'oreille tendue vers un bruissement qui n'aurait pas dû être là.
            </p>
            <p>
              Quelque chose l'observait. Elle le sentait dans chaque fibre de son être.
            </p>
            <p>
              Au-delà du rideau de brume, une silhouette se dessinait. Pas tout à fait humaine, pas tout à fait animale. Elle ondulait entre les troncs d'arbres avec une grâce surnaturelle, ses contours flous se fondant dans l'obscurité grandissante.
            </p>
            <p>
              Élara porta instinctivement la main à l'amulette qui pendait à son cou – l'héritage de sa grand-mère, celui qui était censé la protéger des créatures de l'entre-monde. Mais l'amulette restait froide et inerte. Soit la créature n'était pas ce qu'elle craignait, soit elle était bien plus puissante que tout ce contre quoi le talisman pouvait la protéger.
            </p>
            <p>
              « Qui va là ? » Sa voix tremblait malgré elle, se perdant dans l'immensité de la forêt.
            </p>
            <p>
              La silhouette s'immobilisa. Un long moment s'écoula, où seul le vent dans les feuilles osait troubler le silence. Puis, une voix résonna, profonde et mélodieuse, semblant provenir de partout et de nulle part à la fois.
            </p>
            <p>
              « Tu n'aurais pas dû venir ici, enfant des hommes. Ces bois ne sont pas les tiens. »
            </p>
            <p>
              Élara sentit son cœur battre à tout rompre. Elle savait qu'elle aurait dû faire demi-tour, courir aussi loin et aussi vite que possible. Mais quelque chose la retenait, une curiosité mêlée de fascination qu'elle ne parvenait pas à réprimer.
            </p>
            <p>
              « Je cherche la Fontaine des Murmures, » répondit-elle, sa voix plus assurée qu'elle ne l'aurait cru. « On dit qu'elle peut guérir les blessures que même la magie ne peut atteindre. »
            </p>
            <p>
              Un rire grave s'éleva, se répercutant entre les arbres. « La Fontaine... Bien sûr. Ils viennent toujours pour la Fontaine. Mais sais-tu quel prix elle exige en retour ? »
            </p>
            <p>
              Élara resta silencieuse. Elle n'avait rien à perdre. Son frère se mourait dans leur village, rongé par une malédiction qu'aucun guérisseur n'avait pu lever. Si cette Fontaine pouvait le sauver, elle était prête à payer n'importe quel prix.
            </p>
            <p>
              « Je vois, » murmura la créature, comme si elle lisait dans ses pensées. « Très bien. Suis-moi, si tu l'oses. Mais sache que ceux qui entrent dans ces profondeurs en ressortent rarement indemnes. »
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="w-5 h-5" />
              <span>Partager</span>
            </button>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl text-gray-900 mb-6">Commentaires ({comments.length})</h2>

          {/* Add Comment */}
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Publier</span>
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600">{comment.author[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{comment.likes > 0 ? comment.likes : ''}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
